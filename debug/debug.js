/* global $ */

import { alphabet, Animation } from '../index.js';

const $letterContainer = $( '#letter-container' );
const $flowContainer = $( '#flow-container' );

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

const letterAnimation = new Animation( $letterContainer );
letterAnimation.setupLetter( '#6fb7bd' );
letterAnimation.animateToLetter( alphabet.logo, 500 )
.then(() => {
    letterAnimation.animateToLetter( alphabet.A, 500 );
});

$( 'body' ).on( 'click', () => {
    letterAnimation.animateToLetter( alphabet[options[Math.floor( Math.random() * 26 )]], 500 );
});

const flowAnimation = new Animation( $flowContainer );
flowAnimation.setupFlow();
flowAnimation.startFlow();
