# ReadMore.js

JavaScript library that adds a 'Read more/less' functionality on the text blocks that is applied to.

## API & Usage

```js
// Initialise
var destroy = $readMoreJS({
   target: '.container p',
   wordsCount: 50,
   toggle: true,
   moreLink: 'Read more',
   lessLink: 'Read less',
   linkClass: 'rm-link-classname'
});

// Bring back to initial state if no longer needed.
destroy();
```

### Options

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>String</code> | "" | CSS selector of the HTMLElement that contains the text content to be truncated (any CSS selector, eg: "#", "."). |
| wordsCount<sup>1</sup> | <code>Number</code> | `undefined` | The number of words to display before the "Read more" link. Has no effect if the number provided is greater than the actual words number. |
| charactersCount<sup>1</sup> | <code>Number</code> | `undefined` | The number of characters to display before the "Read more" link. Has no effect if the number provided is greater than the actual characters number. |
| toggle | <code>Boolean</code> | true | If `true`, the user can toggle between "Read more" and "Read less", otherwise when they click once on "Read more" link, they will not be able to display less content again. |
| moreLink | <code>String</code> | "Read more" | The text of "Read more" link. HTML strings are supported, eg `<div>Read more</div>`. |
| lessLink | <code>String</code> | "Read more" | The text of "Read less" link. HTML strings are supported, eg `<div>Read less</div>`. |
| linkClass | <code>String</code> | "" | A class name that is applied on the "Read more/less" link, mostly for styling purposes. |

<sup>1</sup> If both options `wordsCount` and `charactersCount` are used at the same time, the `wordsCount` option take precedencea and the `charactersCount` is just ignored. USe only one of the options for more predictable behaviour.

## Changelog

For API updates and breaking changes, check the [CHANGELOG](https://github.com/georapbox/ReadMore.js/blob/master/CHANGELOG.md).

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2014)
