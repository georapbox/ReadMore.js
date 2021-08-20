/*!
 * ReadMore.js
 * JavaScript library that adds a 'Read more/less' functionality on the text blocks that is applied to.
 *
 * @version 2.0.0
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

  function countWords(str) {
    return str.split(/\s+/).length;
  }

  function generateTrimmed(str, wordsNum) {
    return str.split(/\s+/).slice(0, wordsNum).join(' ') + '... ';
  }

  function init(options) {
    var defaults = {
      target: '',
      wordsCount: 50,
      toggle: true,
      moreLink: 'Read more',
      lessLink: 'Read less',
      linkClass: 'rm-link'
    };

    options = extend({}, defaults, options);

    var targets = document.querySelectorAll(options.target);
    var initArr = [];
    var trimmedArr = [];
    var targetContent, trimmedTargetContent, targetContentWords, i, j, rmLinks;

    function onMoreAnchorClicked(evt) {
      evt.preventDefault();

      var linkEl = evt.currentTarget;
      var linkId = linkEl.getAttribute('id');
      var index = linkId.split('_')[1];

      if (linkEl.getAttribute('data-clicked') !== 'true') {
        targets[index].innerHTML = initArr[index];

        if (options.toggle) {
          linkEl.innerHTML = options.lessLink;
          linkEl.setAttribute('data-clicked', true);
          targets[index].appendChild(linkEl);
        } else {
          linkEl.removeEventListener('click', onMoreAnchorClicked);
        }
      } else {
        targets[index].innerHTML = trimmedArr[index];
        targets[index].appendChild(linkEl);
        linkEl.innerHTML = options.moreLink;
        linkEl.setAttribute('data-clicked', false);
      }
    }

    for (i = 0; i < targets.length; i++) {
      targetContent = targets[i].innerHTML;
      trimmedTargetContent = generateTrimmed(targetContent, options.wordsCount);
      targetContentWords = countWords(targetContent);
      initArr.push(targetContent);
      trimmedArr.push(trimmedTargetContent);

      // Procceed only if the number of words specified by the user is smaller than the number of words the target element has.
      if (options.wordsCount < targetContentWords - 1) {
        targets[i].innerHTML = trimmedArr[i] + '<a href="#" data-readmore="anchor" data-clicked="false" id="rm-more_' + i + '"'
          + ' class="' + options.linkClass + '">'
          + options.moreLink
          + '</a>';
      }
    }

    rmLinks = document.querySelectorAll('[data-readmore="anchor"]');

    for (j = 0; j < rmLinks.length; j++) {
      rmLinks[j].addEventListener('click', onMoreAnchorClicked);
    }

    return function destroy() {
      for (j = 0; j < rmLinks.length; j++) {
        rmLinks[j].removeEventListener('click', onMoreAnchorClicked);
      }

      for (i = 0; i < targets.length; i++) {
        targets[i].innerHTML = initArr[i];
      }
    };
  }

  return init;
}));
