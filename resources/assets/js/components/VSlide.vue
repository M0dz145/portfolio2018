<script>
    import VImage from '@components/VImage';
    import Anime from 'animejs';

    export default {
        data() {
            return {
                ElkyosImage: require('@img/works/elkyos.jpg?sizes[]=200,sizes[]=600,sizes[]=800'),
                panelContainerImage: null,
                panelContent: null,
                panel: null
            }
        },
        mounted() {
            this.panelContainerImage = document.getElementsByClassName('panelContainer__img')[0];
            this.panelContent = document.getElementsByClassName('panel__content')[0];
            this.panel = document.getElementsByClassName('panel')[0];
        },
        methods: {
            setRange(obj) {
                for(let k in obj) {
                    if(typeof obj[k] === 'undefined') {
                        obj[k] = [0, 0];
                    } else if(typeof obj[k] === 'number') {
                        obj[k] = [-1 * obj[k], obj[k]];
                    }
                }

                return obj;
            },
            transform(event, elements) {
                // Mouse position relative to the document.
                const mousepos = this.getMousePosition(event);

                // Movement settings for the animatable elements.
                for(var key in elements) {
                    if(this.DOM.animatable[key] == undefined || this.options.movement[key] == undefined) {
                        continue;
                    }

                    const reinitialisePosition = {
                        x: 0,
                        y: 0,
                        z: 0
                    };

                    let t = this.options.movement[key] != undefined ? this.options.movement[key].translation || reinitialisePosition : reinitialisePosition,
                        r = this.options.movement[key] != undefined ? this.options.movement[key].rotation || reinitialisePosition : reinitialisePosition;

                    t = this.setRange(t);
                    r = this.setRange(r);

                    let transforms = {
                        translation: {
                            x: (t.x[1] - t.x[0]) / bounds.width * mousepos.x + t.x[0],
                            y: (t.y[1] - t.y[0]) / bounds.height * mousepos.y + t.y[0],
                            z: (t.z[1] - t.z[0]) / bounds.height * mousepos.y + t.z[0],
                        },
                        rotation: {
                            x: (r.x[1] - r.x[0]) / bounds.height * mousepos.y + r.x[0],
                            y: (r.y[1] - r.y[0]) / bounds.width * mousepos.x + r.y[0],
                            z: (r.z[1] - r.z[0]) / bounds.width * mousepos.x + r.z[0]
                        }
                    };

                    this.DOM.animatable[key].style.WebkitTransform = this.DOM.animatable[key].style.transform = 'translateX(' + transforms.translation.x + 'px) translateY(' + transforms.translation.y + 'px) translateZ(' + transforms.translation.z + 'px) rotateX(' + transforms.rotation.x + 'deg) rotateY(' + transforms.rotation.y + 'deg) rotateZ(' + transforms.rotation.z + 'deg)';
                }
            },
            move(e) {
                const mousePosition = this.getMousePosition(e);
                const sxPos = mousePosition.x / this.panel.offsetWidth * 100 - 100;
                const syPos = mousePosition.y / this.panel.offsetHeight * 100 - 100;

                this.panelContent.style.transform = `rotateX(${-.03 * sxPos}deg) rotateY(${.03 * syPos}deg) rotateZ(1deg)`;
                this.panelContainerImage.style.transform = `rotateX(${-.03 * sxPos}deg) rotateY(${.03 * syPos}deg) rotateZ(1deg)`;

                let animate = Anime({
                    targets: this.panelContent,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    rotationX: -.03 * sxPos,
                    rotationY: .03 * syPos,
                    rotationZ: 1,
                    elasticity: 600,
                    duration: 200,
                    loop: false,
                    easing: 'easeInOutQuad'
                });

                Anime({
                    targets: this.panelContainerImage,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                    rotationX: -.03 * sxPos,
                    rotationY: .03 * syPos,
                    rotationZ: 1,
                    elasticity: 600,
                    duration: 200,
                    loop: false,
                    easing: 'easeInOutQuad'
                })

                console.log(animate);
            },
            getMousePosition(e) {
                let posX = 0,
                    posY = 0;

                if(e.pageX || e.pageY) {
                    posX = e.pageX;
                    posY = e.pageY;
                } else if(e.clientX || e.clientY) {
                    posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }

                return {
                    x: posX,
                    y: posY
                };
            }
        },
        components: {
            VImage
        }
    }
</script>

<template>
    <div class="slide" @mousemove="move">
        <div class="panel">
            <div class="panelContainer__content">
                <div class="panel__content">
                    <div class="panel__text">
                        <h2 class="panel__title">Elkyos</h2>
                        <p class="panel__info">
                            MMORPG médiéval fantastique
                        </p>
                    </div>
                    <div class="panel__line"></div>
                </div>
            </div>
            <div class="panelContainer__img">
                <VImage class="panel__img" :src="ElkyosImage.src" :srcSet="ElkyosImage.srcSet"
                        :styles="{width: '100%', height: '100%'}"
                        alt="Description"></VImage>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./../../sass/mixins/mixins";

    .slide {
        position: absolute;
        width: 100%;
        height: 100%;
        perspective: 500px;
        @include no-user-select();

        .panel {
            display: block;
            position: relative;
            top: 50%;
            left: 50%;
            width: 100%;
            max-width: 1200px;
            height: 466px;
            transform: translate3d(-50%, -50%, 0);

            .panelContainer__content {
                .panel__content {
                    z-index: z(slidePanelContent);
                    position: absolute;
                    top: 26%;
                    left: 0;
                    width: 100%;

                    .panel__text {
                        display: inline-block;
                        text-align: right;
                        color: white;

                        .panel__title {
                            font-size: 3em;
                        }

                        .panel__info {
                            position: relative;
                            margin: 16px 0 0;

                            &::before {
                                content: '';
                                margin: 9px 14px 0 0;
                                height: 1px;
                                width: 30px;
                                background-color: white;
                            }
                        }
                    }

                    .panel__line {
                        margin: 24px 0 0 40%;
                        width: 64%;
                        height: 3px;
                        background-color: white;
                    }
                }
            }

            .panelContainer__img {
                width: 100%;
                height: 100%;
                overflow: hidden;
                box-shadow: 0px 20px 100.28px 8.72px rgba(0, 0, 0, .35);

                .panel__img {
                    display: block;
                    width: 100%;
                    min-height: 100%;
                    @include no-pointer-events();
                }
            }
        }
    }
</style>