/* global $ */

require( '../bower_components/jquery.hx/dist/hx' );

class Animation {

    constructor( containerSelector ) {
        this.$container = $( containerSelector );
    }

    setupLetter( color ) {
        this.yCount = 8;
        this.xCount = 8;
        for ( let y = 0; y < this.yCount; y++ ) {
            for ( let x = 0; x < this.xCount; x++ ) {
                $( document.createElement( 'div' ))
                .addClass( 'cube' )
                .addClass( 'letter' )
                .addClass( `letter-cube-${x}-${y}` )
                .css({
                    backgroundColor: color || '#447c91',
                    width: `${100 / this.xCount}%`,
                    height: `${100 / this.yCount}%`,
                    transformOrigin: 'center',
                    position: 'absolute',
                    top: `${100 / this.yCount * y}%`,
                    left: `${100 / this.xCount * x}%`,
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
        for ( let y = 0; y < this.yCount; y++ ) {
            for ( let x = 0; x < this.xCount; x++ ) {
                const scale = letterMatrix[y][x] || 0.01;
                const selector = `.letter-cube-${x}-${y}`;
                const delay = ( x + y ) * duration / 10 || 1;
                let $el = $( selector ).hx( 'clear' ).defer( delay );
                const startScale = $el.hx( 'get', 'transform' )[0].scale;
                if ( startScale > 0.01 || scale === 1 ) {
                    $el = $el.hx({
                        type: 'opacity',
                        value: 1,
                        duration: 10,
                    });
                }
                $el = $el.hx({
                    type: 'transform',
                    scale: { x: scale, y: scale },
                    duration,
                });
                if ( scale !== 1 ) {
                    $el = $el.hx({
                        type: 'opacity',
                        value: 0,
                        duration: 10,
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

    createFlowCube( x, y, i, value, color ) {
        const marginX = 9;
        const marginY = 6;
        return $( document.createElement( 'div' ))
        .addClass( 'cube' )
        .addClass( `flow-${value}-cube-${i}` )
        .css({
            width: `${100 / this.xCount - marginX}%`,
            height: `${100 / this.yCount - marginY}%`,
            transformOrigin: 'center',
            position: 'absolute',
            top: `${100 / this.yCount * y + marginY / 2}%`,
            left: `${100 / this.xCount * x + marginX / 2}%`,
            backgroundColor: color,
        });
    }

    flowUp( $el, start ) {
        const startVal = start === 0.01 || !start ? 0 : start;
        $el.hx({
            type: 'transform',
            scale: { x: 1, y: 1 },
            duration: 5000 * ( 1 - startVal ),
        });
        return this.resolveAnimation( $el );
    }

    flowLoopLight( i, start ) {
        const $el = $( `.flow-light-cube-${i}` );
        $el.hx( 'zero', {
            type: 'transform',
            scale: { x: start || 0.01, y: start || 0.01 },
        });
        $( `.flow-dark-cube-${i}.flow-layer-2` ).hide();
        this.flowUp( $el, start )
        .then(() => this.flowLoopDark( i ));
    }

    flowLoopDark( i, start ) {
        const $el = $( `.flow-dark-cube-${i}` );
        $el.hx( 'zero', {
            type: 'transform',
            scale: { x: start || 0.01, y: start || 0.01 },
        });
        $( `.flow-dark-cube-${i}.flow-layer-2` ).show();
        this.flowUp( $el, start )
        .then(() => this.flowLoopLight( i ));
    }

    startFlow() {
        for ( let i = 0; i < 5; i++ ) {
            $( `.flow-dark-cube-${i}` ).hx( 'zero', {
                type: 'transform',
                scale: { x: 1, y: 1 },
            });
            $( `.flow-light-cube-${i}` ).hx( 'zero', {
                type: 'transform',
                scale: { x: i * 0.2, y: i * 0.2 },
            });
            this.flowLoopLight( i, i * 0.2 );
        }
        for ( let i = 5; i < 10; i++ ) {
            $( `.flow-dark-cube-${i}` ).hx( 'zero', {
                type: 'transform',
                scale: { x: ( i - 5 ) * 0.2, y: ( i - 5 ) * 0.2 },
            });
            $( `.flow-light-cube-${i}` ).hx( 'zero', {
                type: 'transform',
                scale: { x: 1, y: 1 },
            });
            this.flowLoopDark( i, ( i - 5 ) * 0.2 );
        }
    }

    setupFlow( lightColor, darkColor ) {
        this.yCount = 4;
        this.xCount = 3;
        [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
        ].forEach(( coordinates, i ) => {
            this.$container
            .append( this.createFlowCube(
                coordinates.x,
                coordinates.y,
                i,
                'dark',
                darkColor || '#447c91'
            ).addClass( 'flow-layer-0' ))
            .append( this.createFlowCube(
                coordinates.x,
                coordinates.y,
                i,
                'light',
                lightColor || '#6fb7bd'
            ).addClass( 'flow-layer-1' ))
            .append( this.createFlowCube(
                coordinates.x,
                coordinates.y,
                i,
                'dark',
                darkColor || '#447c91'
            ).addClass( 'flow-layer-2' ));
        });
    }

}

export default Animation;
