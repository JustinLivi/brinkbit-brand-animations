/* global $, expect */

import { alphabet, Animation } from '../index.js';

describe( 'Animation', () => {
    let $container;
    let animation;

    before( function() {
        $container = $( document.createElement( 'div' ))
        .css({
            width: 160,
            height: 160,
        })
        .appendTo(
            $( 'body' )
        );
    });

    it( 'should be a class', function() {
        expect( Animation ).to.be.a.class;
    });

    describe( 'Animation constructor', function() {
        it( 'should properly set the cubeWidth and cubeHeight', function() {
            animation = new Animation( $container );
            expect( animation.cubeWidth ).to.equal( 20 );
            expect( animation.cubeHeight ).to.equal( 20 );
        });
    });

    describe( '#setupLetter()', function() {
        it( 'should create a grid in the DOM', function() {
            animation.setupLetter();
            for ( let y = 0; y < 8; y++ ) {
                for ( let x = 0; x < 8; x++ ) {
                    expect( $container.find( `.letter-cube-${x}-${y}` ).length ).to.equal( 1 );
                }
            }
        });
    });

    describe( '#animateToLetter()', function() {
        it( 'should scale letters appropriately', function() {
            function getScale( $element ) {
                return $element.hx( 'get', 'transform' )[0].scale;
            }
            const smallScale = {
                x: 0.01,
                y: 0.01,
                z: 1,
            };
            const fullScale = {
                x: 1,
                y: 1,
                z: 1,
            };
            return animation.animateToLetter( alphabet.logo, 1000 )
            .then(() => {
                expect( getScale( $container.find( `.letter-cube-0-0` ))).to.deep.equal( smallScale );
                expect( getScale( $container.find( `.letter-cube-1-0` ))).to.deep.equal( fullScale );
                return Promise.resolve();
            });
        });
    });
});
