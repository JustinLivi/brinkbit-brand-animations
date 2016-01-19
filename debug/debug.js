/* global $ */

import alphabet from '../src/letters.js';
import Animation from '../src/index.js';

const $container = $( document.createElement( 'div' ))
.css({
    width: 160,
    height: 160,
})
.appendTo(
    $( 'body' )
);

const animation = new Animation( $container );
animation.setupShape();
animation.animateToLetter( alphabet.logo );
