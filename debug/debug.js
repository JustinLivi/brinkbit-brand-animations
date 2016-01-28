/* global $ */

import { alphabet, Animation } from '../index.js';

const $container = $( document.createElement( 'div' ))
.css({
    width: 160,
    height: 160,
})
.appendTo(
    $( 'body' )
);

const animation = new Animation( $container );
animation.setupLetter();
animation.animateToLetter( alphabet.logo, 500 )
.then(() => {
    animation.animateToLetter( alphabet.A, 500 );
});
