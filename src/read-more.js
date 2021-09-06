/*!
 * ReadMore.js
 * JavaScript library that adds a 'Read more/less' functionality on the text blocks that is applied to.
 *
 * @version 3.0.0
 * @author George Raptis <georapbox@gmail.com>
 * @repository https://github.com/georapbox/ReadMore.js.git
 * @license MIT
 */
(function (name, context, definition) {
  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition(name, context);
  }
}('$readMoreJS', this, function () {
  'use strict';

  var linkDataIdPrefix = 'read-more-link_';

  function extend() {
    for (var i = 1, l = arguments.length; i < l; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
            arguments[0][key] = arguments[0][key] || {};
            extend(arguments[0][key], arguments[i][key]);
          } else {
            arguments[0][key] = arguments[i][key];
          }
        }
      }
    }
    return arguments[0];
  }

  function getWords(subjectString) {
    if (typeof subjectString !== 'string') {
      return [];
    }

    return subjectString.split(/\s+/).filter(Boolean);
  }

  function truncateByWordsCount(subjectString, wordsCount, suffix) {
    var words = getWords(subjectString);

    wordsCount = Math.floor(wordsCount);

    if (wordsCount > words.length || wordsCount < 0 || isNaN(wordsCount)) {
      return subjectString;
    }

    return words.slice(0, wordsCount).join(' ') + (suffix || '');
  }

  function truncateByCharactersCount(subjectString, characterCount, suffix) {
    var regex, truncated;

    characterCount = Math.floor(characterCount);

    if (characterCount > subjectString.length || characterCount < 0 || isNaN(characterCount)) {
      return subjectString;
    }

    regex = new RegExp('^.{0,' + characterCount + '}[S]*', 'g');
    truncated = subjectString.match(regex);
    suffix = suffix || '';
    truncated = truncated[0].replace(/\s$/, '');
    truncated = truncated + suffix;

    return truncated;
  }

  function trim(subjectString) {
    return String.prototype.trim
      ? subjectString.trim()
      : subjectString.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }

  function isNaN(value) {
    if (Number.isNaN) {
      return Number.isNaN(value);
    }

    // NaN is of type "number" and it is also the only primitive value which does not equal itself.
    return typeof value === 'number' && value !== value;
  }

  function printLink(index, linkClass, moreLink) {
    return '<a href="#" data-clicked="false" data-id="' + linkDataIdPrefix + index + '"'
      + (linkClass ? ' class="' + linkClass + '"' : '') + '>'
      + moreLink
      + '</a>';
  }

  function init(options) {
    var defaults = {
      target: '',
      wordsCount: void 0,
      charactersCount: void 0,
      toggle: true,
      moreLink: 'Read more',
      lessLink: 'Read less',
      linkClass: ''
    };

    options = extend({}, defaults, options);

    var targets = document.querySelectorAll(options.target);
    var initialArray = [];
    var truncatedArray = [];
    var initialContent, truncatedContent, i, j, rmLinks;

    function onMoreAnchorClicked(evt) {
      evt.preventDefault();

      var linkEl = evt.currentTarget;
      var linkId = linkEl.getAttribute('data-id');
      var index = linkId.split('_')[1];

      if (linkEl.getAttribute('data-clicked') !== 'true') {
        targets[index].innerHTML = initialArray[index];

        if (options.toggle) {
          linkEl.innerHTML = options.lessLink;
          linkEl.setAttribute('data-clicked', true);
          targets[index].appendChild(linkEl);
        } else {
          linkEl.removeEventListener('click', onMoreAnchorClicked);
        }
      } else {
        targets[index].innerHTML = truncatedArray[index];
        targets[index].appendChild(linkEl);
        linkEl.innerHTML = options.moreLink;
        linkEl.setAttribute('data-clicked', false);
      }
    }

    for (i = 0; i < targets.length; i++) {
      initialContent = trim(targets[i].innerHTML);

      if (options.wordsCount) {
        truncatedContent = truncateByWordsCount(initialContent, options.wordsCount, '...');
      } else if (options.charactersCount) {
        truncatedContent = truncateByCharactersCount(initialContent, options.charactersCount, '...');
      }

      initialArray.push(initialContent);
      truncatedArray.push(truncatedContent);

      if (options.wordsCount && options.wordsCount < getWords(initialContent).length) {
        targets[i].innerHTML = truncatedArray[i] + printLink(i, options.linkClass, options.moreLink);
      } else if (options.charactersCount && options.charactersCount < initialContent.length) {
        targets[i].innerHTML = truncatedArray[i] + printLink(i, options.linkClass, options.moreLink);
      }
    }

    rmLinks = document.querySelectorAll('[data-id^="' + linkDataIdPrefix + '"]');

    for (j = 0; j < rmLinks.length; j++) {
      rmLinks[j].addEventListener('click', onMoreAnchorClicked);
    }

    return function destroy() {
      for (j = 0; j < rmLinks.length; j++) {
        rmLinks[j].removeEventListener('click', onMoreAnchorClicked);
      }

      for (i = 0; i < targets.length; i++) {
        targets[i].innerHTML = initialArray[i];
      }
    };
  }

  return init;
}));
