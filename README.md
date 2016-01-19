# brinkbit-animation

TODO: Write a project description

## Installation

`npm i --save brinkbit-animation`

## Dependencies

Currently directly depends on global jquery and jquery.hx
This will hopefully be deprecated in the future.

## Usage

Exposes es2015 modules which need to be transpiled and bundled.

For letter animations:

```javascript
import alphabet from '../src/letters.js';
import Animation from '../src/index.js';

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

`npm install -g gulp`
`npm run test`

## Contributing

The guide for contributing to any Brinkbit repository can be found [here](https://github.com/Brinkbit/brinkbit-style-es6#contributing).
