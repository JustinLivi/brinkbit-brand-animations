/* global $ */

require( '../bower_components/jquery.hx/dist/hx' );

const yCount = 8;
const xCount = 8;

class Animation {

    constructor( containerSelector ) {
        this.$container = $( containerSelector );
    }

    setupLetter( color ) {
        for ( let y = 0; y < yCount; y++ ) {
            for ( let x = 0; x < xCount; x++ ) {
                $( document.createElement( 'div' ))
                .addClass( 'cube' )
                .addClass( 'letter' )
                .addClass( `letter-cube-${x}-${y}` )
                .css({
                    opacity: 0,
                    backgroundColor: color || '#1c97ea',
                    width: `${100 / xCount}%`,
                    height: `${100 / yCount}%`,
                    transformOrigin: 'center',
                    position: 'absolute',
                    top: `${100 / yCount * y}%`,
                    left: `${100 / xCount * x}%`,
                })
                .hx( 'zero', {
                    type: 'transform',
                    scale: { x: 0.01, y: 0.01 },
                })
                .appendTo( this.$container );
            }
        }
    }

    animateToLetter( letterMatrix, duration ) {
        for ( let y = 0; y < yCount; y++ ) {
            for ( let x = 0; x < xCount; x++ ) {
                const scale = letterMatrix[y][x] || 0.01;
                const selector = `.letter-cube-${x}-${y}`;
                let $el = $( selector );
                const startScale = $el.hx( 'get', 'transform' )[0].scale;
                if ( startScale > 0.01 || scale === 1 ) {
                    $el.css({ opacity: 1 });
                }
                $el = $el.hx( 'clear' ).hx({
                    type: 'transform',
                    scale: { x: scale, y: scale },
                    duration,
                    delay: ( x + y ) * duration / 10,
                });
                if ( scale !== 1 ) {
                    $el.then( next => {
                        $el.css({ opacity: 0 });
                        next();
                    });
                }
            }
        }
        return this.resolveAnimation( '.letter' );
    }

    resolveAnimation( element ) {
        const $element = typeof element === 'string' ? $( element ) : element;
        return new Promise(( resolve, reject ) => {
            if ( !$element || $element.length === 0 ) {
                reject( new Error( 'Invalid selector' ));
                return;
            }
            $element.hx()
            .then( next => {
                resolve();
                next();
            });
        });
    }

}

export default Animation;
