/* global $ */

require( '../bower_components/jquery.hx/dist/hx' );

const yCount = 8;
const xCount = 8;

class Animation {

    constructor( containerSelector ) {
        this.$container = $( containerSelector );
        this.cubeWidth = this.$container.width() / xCount;
        this.cubeHeight = this.$container.height() / yCount;
    }

    setupLetter() {
        for ( let y = 0; y < yCount; y++ ) {
            for ( let x = 0; x < xCount; x++ ) {
                $( document.createElement( 'div' ))
                .addClass( 'cube' )
                .addClass( 'letter' )
                .addClass( `letter-cube-${x}-${y}` )
                .css({
                    backgroundColor: '#1c97ea',
                    width: this.cubeWidth,
                    height: this.cubeHeight,
                    transformOrigin: 'center',
                    position: 'absolute',
                    top: y * this.cubeWidth,
                    left: x * this.cubeHeight,
                })
                .hx( 'zero', {
                    type: 'transform',
                    scale: { x: 0.01, y: 0.01 },
                })
                .appendTo( this.$container );
            }
        }
        return this.resolveAnimation();
    }

    animateToLetter( letterMatrix, duration ) {
        let fullSelector = '';
        for ( let y = 0; y < yCount; y++ ) {
            for ( let x = 0; x < xCount; x++ ) {
                const scale = letterMatrix[y][x] || 0.01;
                const selector = `.letter-cube-${x}-${y}`;
                $( selector ).hx({
                    type: 'transform',
                    scale: { x: scale, y: scale },
                    duration,
                });
                if ( x || y ) {
                    fullSelector += ', ';
                }
                fullSelector += selector;
            }
        }
        return this.resolveAnimation( fullSelector );
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
