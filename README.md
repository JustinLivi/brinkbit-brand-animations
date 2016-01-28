# brinkbit-brand-animations

> They're specific to our brand, but hey, if you're curious, we're an open book.

Proprietary brand animations for Brinkbit.

## Installation

`npm i --save brinkbit-brand-animations`

## Dependencies

Currently directly depends on global jquery and jquery.hx

## Usage

Exposes es2015 modules which need to be transpiled and bundled.

For letter animations:

```javascript
import { alphabet, Animation } from 'node_modules/brinkbit-brand-animations';

// pass in a container element
const $container = $( '.container' );
const animation = new Animation( $container );
animation.setupLetter();
// pass in the letter we want to animate to and the duration of the animation
animation.animateToLetter( alphabet.logo, 1000 )
.then(() => {
    // the animation has completed
});
```

## Testing

`npm test`

## Contributing

The guide for contributing to any Brinkbit repository can be found [here](https://github.com/Brinkbit/brinkbit-style-es6#contributing).
