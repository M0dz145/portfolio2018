import Anime from 'animejs';

export default class TiltFx {
    constructor(element, options) {
        this.element = element;
        this.options = {
            movement: []
        };

        TiltFx.extend(this.options, options);

        // this.options = {
        //     movement: {
        //         imgWrapper: {
        //             translation: {x: 0, y: 0, z: 0},
        //             rotation: {x: -5, y: 5, z: 0},
        //             reverseAnimation: {
        //                 duration: 1200,
        //                 easing: 'easeOutElastic',
        //                 elasticity: 600
        //             }
        //         },
        //         lines: {
        //             translation: {x: 10, y: 10, z: [0, 10]},
        //             reverseAnimation: {
        //                 duration: 1000,
        //                 easing: 'easeOutExpo',
        //                 elasticity: 600
        //             }
        //         },
        //         caption: {
        //             translation: {x: 20, y: 20, z: 0},
        //             rotation: {x: 0, y: 0, z: 0},
        //             reverseAnimation: {
        //                 duration: 1500,
        //                 easing: 'easeOutElastic',
        //                 elasticity: 600
        //             }
        //         },
        //         shine: {
        //             translation: {x: 50, y: 50, z: 0},
        //             reverseAnimation: {
        //                 duration: 1200,
        //                 easing: 'easeOutElastic',
        //                 elasticity: 600
        //             }
        //         }
        //     }
        // };
        this.element.addEventListener('mousemove', (ev) => requestAnimationFrame(() => this.mouseMove(ev)));

        if(this.options.mouseLeave) {
            this.element.addEventListener('mouseleave', () => requestAnimationFrame(() => this.mouseLeave.call(this)));
            this.element.addEventListener('mouseenter', () => this.mouseEnter.call(this));
        }
    }

    addElement(element, options) {
        this.options.movement.push({
            element: this.element.querySelector(element),
            ...options
        });

        return this;
    }

    mouseEnter() {
        this.options.movement.forEach(movement => Anime.remove(movement.element));
    }

    mouseLeave() {
        this.options.movement.forEach(movement => Anime({
            targets: movement.element,
            duration: typeof movement.reverseAnimation !== 'undefined' ? movement.reverseAnimation.duration || 0 : 1,
            easing: typeof movement.reverseAnimation !== 'undefined' ? movement.reverseAnimation.easing || 'linear' : 'linear',
            elasticity: typeof movement.reverseAnimation !== 'undefined' ? movement.reverseAnimation.elasticity || null : null,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }));
    }

    mouseMove(ev) {
        // Mouse position relative to the document.
        const mousepos    = TiltFx.getMousePos(ev),
              // Document scrolls.
              docScrolls  = {
                  left: document.body.scrollLeft + document.documentElement.scrollLeft,
                  top: document.body.scrollTop + document.documentElement.scrollTop
              },
              bounds      = this.element.getBoundingClientRect(),
              // Mouse position relative to the main element (this.element).
              relmousepos = {
                  x: mousepos.x - bounds.left - docScrolls.left,
                  y: mousepos.y - bounds.top - docScrolls.top
              };

        this.options.movement.forEach(movement => {
            const translation = movement.translation || TiltFx.vector3(0, 0, 0),
                  rotation    = movement.rotation || TiltFx.vector3(0, 0, 0);

            TiltFx.setRange(translation);
            TiltFx.setRange(rotation);

            const transforms = {
                translation: {
                    x: (translation.x[1] - translation.x[0]) / bounds.width * relmousepos.x + translation.x[0],
                    y: (translation.y[1] - translation.y[0]) / bounds.height * relmousepos.y + translation.y[0],
                    z: (translation.z[1] - translation.z[0]) / bounds.height * relmousepos.y + translation.z[0],
                },
                rotation: {
                    x: (rotation.x[1] - rotation.x[0]) / bounds.height * relmousepos.y + rotation.x[0],
                    y: (rotation.y[1] - rotation.y[0]) / bounds.width * relmousepos.x + rotation.y[0],
                    z: (rotation.z[1] - rotation.z[0]) / bounds.width * relmousepos.x + rotation.z[0]
                }
            };

            // let animations = [];
            // if(movement.anime) {
            //     movement.anime.animations.forEach(animation => {
            //         animations[animation.property] = typeof animation.currentValue !== 'number' ? Number(animation.currentValue.replace(/px/, '')) : animation.currentValue;
            //     });
            //
            //     Anime.remove(movement.element);
            //
            //     movement.element.style.WebkitTransform = movement.element.style.transform = `
            //         translateX(${animations['translateX']}px)
            //         translateY(${animations['translateY']}px)
            //         translateZ(${animations['translateZ']}px)
            //         rotateX(${animations['rotationX']}deg)
            //         rotateY(${animations['rotationY']}deg)
            //         rotateZ(${animations['rotationZ']}deg)
            //     `;
            // }

            movement.anime = Anime({
                targets: movement.element,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                translateX: transforms.translation.x,
                translateY: transforms.translation.y,
                translateZ: transforms.translation.z,
                rotateX: transforms.rotation.x,
                rotateY: transforms.rotation.y,
                rotateZ: transforms.rotation.z,
                duration: movement.duration || 0,
                elasticity: movement.elasticity || 0,
                easing: movement.easing || 'easeOutCirc'
            });
        });
    }

    // Helper vars and functions.
    static extend(a, b) {
        for(const key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }

        return a;
    }

    static setRange(obj) {
        for(const k in obj) {
            if(typeof obj[k] === 'undefined') {
                obj[k] = [0, 0];
            } else if(typeof obj[k] === 'number') {
                obj[k] = [-1 * obj[k], obj[k]];
            }
        }
    }

    // from http://www.quirksmode.org/js/events_properties.html#position
    static getMousePos(e) {
        let posx = 0, posy = 0;

        if(!e) e = window.event;

        if(e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if(e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {x: posx, y: posy}
    }

    static vector3(x, y, z) {
        return {
            x,
            y,
            z
        };
    }
}