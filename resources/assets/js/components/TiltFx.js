import Anime from 'animejs';

export default class TiltFx {
    /**
     * TiltFx obj.
     */
    constructor(el, options) {
        this.DOM = {};
        this.DOM.el = el;
        this.options = TiltFx.extend({}, this.options);
        TiltFx.extend(this.options, options);

        this.options = {
            movement: {
                imgWrapper: {
                    translation: {x: 0, y: 0, z: 0},
                    rotation: {x: -5, y: 5, z: 0},
                    reverseAnimation: {
                        duration: 1200,
                        easing: 'easeOutElastic',
                        elasticity: 600
                    }
                },
                lines: {
                    translation: {x: 10, y: 10, z: [0, 10]},
                    reverseAnimation: {
                        duration: 1000,
                        easing: 'easeOutExpo',
                        elasticity: 600
                    }
                },
                caption: {
                    translation: {x: 20, y: 20, z: 0},
                    rotation: {x: 0, y: 0, z: 0},
                    reverseAnimation: {
                        duration: 1500,
                        easing: 'easeOutElastic',
                        elasticity: 600
                    }
                },
                shine: {
                    translation: {x: 50, y: 50, z: 0},
                    reverseAnimation: {
                        duration: 1200,
                        easing: 'easeOutElastic',
                        elasticity: 600
                    }
                }
            }
        };

        this._init();
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

    _init() {
        this.DOM.animatable = {};
        this.DOM.animatable.imgWrapper = this.DOM.el.querySelector('.panelContainer__img');
        this.DOM.animatable.lines = this.DOM.el.querySelector('.panel__content');
        // this.DOM.animatable.caption = this.DOM.el.querySelector('.tilter__caption');
        // this.DOM.animatable.overlay = this.DOM.el.querySelector('.tilter__deco--overlay');
        // this.DOM.animatable.shine = this.DOM.el.querySelector('.tilter__deco--shine > div');
        this._initEvents();
    }

    /**
     * Init/Bind events.
     */
    _initEvents() {
        const self = this;

        this.DOM.el.addEventListener('mousemove', (ev) => requestAnimationFrame(() => this._layout(ev)));

        this.DOM.el.addEventListener('mouseleave', (ev) => requestAnimationFrame(() => {
            for(const key in self.DOM.animatable) {
                if(typeof self.options.movement[key] === 'undefined') {
                    continue;
                }

                Anime({
                    targets: self.DOM.animatable[key],
                    duration: typeof self.options.movement[key].reverseAnimation !== 'undefined' ? self.options.movement[key].reverseAnimation.duration || 0 : 1,
                    easing: typeof self.options.movement[key].reverseAnimation !== 'undefined' ? self.options.movement[key].reverseAnimation.easing || 'linear' : 'linear',
                    elasticity: typeof self.options.movement[key].reverseAnimation !== 'undefined' ? self.options.movement[key].reverseAnimation.elasticity || null : null,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    translateX: 0,
                    translateY: 0,
                    translateZ: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                });
            }
        }));

        this.DOM.el.addEventListener('mouseenter', (ev) => {
            for(const key in self.DOM.animatable) {
                Anime.remove(self.DOM.animatable[key]);
            }
        });
    }

    static getResetPosition() {
        return {
            x: 0,
            y: 0,
            z: 0
        };
    }

    _layout(ev) {
        // Mouse position relative to the document.
        const mousepos    = TiltFx.getMousePos(ev),
              // Document scrolls.
              docScrolls  = {
                  left: document.body.scrollLeft + document.documentElement.scrollLeft,
                  top: document.body.scrollTop + document.documentElement.scrollTop
              },
              bounds      = this.DOM.el.getBoundingClientRect(),
              // Mouse position relative to the main element (this.DOM.el).
              relmousepos = {
                  x: mousepos.x - bounds.left - docScrolls.left,
                  y: mousepos.y - bounds.top - docScrolls.top
              };

        // Movement settings for the animatable elements.
        for(const key in this.DOM.animatable) {
            if(typeof this.DOM.animatable[key] === 'undefined' || typeof this.options.movement[key] === 'undefined') {
                continue;
            }

            const t = typeof this.options.movement[key] !== 'undefined' ? this.options.movement[key].translation || TiltFx.getResetPosition() : TiltFx.getResetPosition(),
                  r = typeof this.options.movement[key] !== 'undefined' ? this.options.movement[key].rotation || TiltFx.getResetPosition() : TiltFx.getResetPosition();

            TiltFx.setRange(t);
            TiltFx.setRange(r);

            const transforms = {
                translation: {
                    x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                    y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
                    z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0],
                },
                rotation: {
                    x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                    y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
                    z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
                }
            };

            this.DOM.animatable[key].style.WebkitTransform = this.DOM.animatable[key].style.transform = 'translateX(' + transforms.translation.x + 'px) translateY(' + transforms.translation.y + 'px) translateZ(' + transforms.translation.z + 'px) rotateX(' + transforms.rotation.x + 'deg) rotateY(' + transforms.rotation.y + 'deg) rotateZ(' + transforms.rotation.z + 'deg)';
        }
    }
}