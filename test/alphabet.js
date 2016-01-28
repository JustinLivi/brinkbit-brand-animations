/* global expect */

import { alphabet } from '../index.js';

describe( 'alphabet', function() {
    it( 'should be an object', function() {
        expect( alphabet ).to.be.an.object;
    });

    [
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
    ].forEach( letter => {
        it( 'should have the property ' + letter, function() {
            expect( alphabet ).to.have.property( letter );
            expect( alphabet[letter]).to.be.an.array;
        });
    });
});
