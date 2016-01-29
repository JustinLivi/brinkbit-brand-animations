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

const options = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'logo',
];

const animation = new Animation( $container );
animation.setupLetter( '#6fb7bd' );
animation.animateToLetter( alphabet.logo, 500 )
.then(() => {
    animation.animateToLetter( alphabet.A, 500 );
});

$( 'body' ).on( 'click', () => {
    animation.animateToLetter( alphabet[options[Math.floor( Math.random() * 26 )]], 500 );
});
