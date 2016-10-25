# ReadMore.js

A small vanilla Javascript plugin that adds a 'read more' functionality on the text blocks that is applied to.

## How to use

#### HTML

```html
<div class="dummy">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, vel fuga rerum asperiores quos qui exercitationem et expedita libero corrupti. Placeat tempore aspernatur sapiente non consectetur labore corporis ipsum iste.
  </p>
</div>
<div class="dummy">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, voluptatem obcaecati at praesentium sunt voluptatum dolorum. Consequatur, fugiat optio itaque nihil quibusdam repellendus mollitia assumenda placeat debitis reiciendis vel perspiciatis!
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, autem, eos, fugit, id commodi vel aliquam dolorum placeat magnam repudiandae ratione quidem omnis at earum dolores consequuntur molestias! Veritatis, ipsam!
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, quam tempora fuga accusantium illum eum iure veritatis doloremque incidunt. Dolor, placeat, veritatis facilis culpa error asperiores ipsam repellat aliquid numquam.
  </p>
</div>
```

#### Javascript

```js
$readMoreJS.init({
   target: '.dummy p',        // Selector of the element the plugin applies to (any CSS selector, eg: '#', '.'). Default: ''
   numOfWords: 50,            // Number of words to initially display (any number). Default: 50
   toggle: true,              // If true, user can toggle between 'read more' and 'read less'. Default: true
   moreLink: 'read more ...', // The text of 'Read more' link. Default: 'read more ...'
   lessLink: 'read less'      // The text of 'Read less' link. Default: 'read less'
});
```

## Browser compatibility

- IE8+
- All real browsers :simple_smile:
