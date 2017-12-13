<script>
    import VSlide from '@components/VSlide';
    import TiltFx from '@components/TiltFx';
    import VClose from '@components/VClose';

    export default {
        mounted() {
            let sliders = null;
            if(typeof this.$route.params.name !== 'undefined') {
                sliders = this.sliders(this.$route.params.name);
            } else {
                sliders = this.sliders(this.works[0].name);
            }

            this.slideLeft = sliders.left.name;
            this.slideRight = sliders.right.name;
            this.currentSlide = sliders.current;

            this.slideMouseContainer = document.getElementById('slideControlContainer__mouse');
            this.slideMouse = this.slideMouseContainer.querySelector('.slideControl__mouse');

            const TiltFxInstance = new TiltFx(document.getElementById('slide__container'), {
                mouseLeave: false
            });

            TiltFxInstance
                .addElement('.panel__content', {
                    translation: TiltFx.vector3(10, 10, 0),
                    rotation: TiltFx.vector3(5, 5, 0),
                    duration: 800,
                    elasticity: 100,
                    easing: 'easeOutCirc',
                    reverseAnimation: {
                        duration: 1200,
                        easing: 'easeOutCirc',
                        elasticity: 600
                    }
                })
                .addElement('.panelContainer__img', {
                    translation: TiltFx.vector3(5, 5, 0),
                    rotation: TiltFx.vector3(5, 5, 0),
                    duration: 800,
                    elasticity: 400,
                    easing: 'easeOutCirc',
                    reverseAnimation: {
                        duration: 1000,
                        easing: 'easeOutCirc',
                        elasticity: 800
                    }
                });
        },
        data() {
            return {
                works: [
                    {
                        name: 'Elkyos',
                        description: 'MMORPG médiéval fantastique, 2014',
                        image: require('@img/works/elkyos.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
                    },
                    {
                        name: '2',
                        description: 'testnsuerhuser, 4455',
                        image: require('@img/works/nicolasChevalier.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
                    },
                    {
                        name: '3',
                        description: 'azeazeaze, 5605640',
                        image: require('@img/works/immobilis.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
                    }
                ],
                currentSlide: null,
                slideLeft: null,
                slideRight: null
            };
        },
        beforeRouteUpdate(to, from, next) {
            if(to.name === 'works' && typeof to.params.name !== 'undefined') {
                const sliders = this.sliders(to.params.name);

                this.slideLeft = sliders.left.name;
                this.slideRight = sliders.right.name;
                this.currentSlide = sliders.current;
            }

            next();
        },
        components: {
            VSlide,
            VClose
        },
        methods: {
            sliders(to) {
                const toIndex = this.works.findIndex(work => to === work.name);

                if(toIndex === -1) {
                    console.error(`Route ${to} doesn't exist`);
                    return;
                }

                let leftIndex = toIndex - 1;
                if(leftIndex < 0) {
                    leftIndex = this.works.length - 1
                }

                let rightIndex = toIndex + 1;
                if(rightIndex >= this.works.length) {
                    rightIndex = 0;
                }

                return {
                    left: this.works[leftIndex],
                    right: this.works[rightIndex],
                    current: this.works[toIndex]
                }
            },
            mousemove(ev) {
                const x      = ev.clientX,
                      y      = ev.clientY,
                      rotate = ev.target.attributes['data-direction'].value === 'left' ? 0 : 180;

                this.slideMouseContainer.style.setProperty('display', 'block');
                this.slideMouseContainer.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`);
                this.slideMouse.style.setProperty('transform', `translate3d(-50%, -50%, 0) rotate(${rotate}deg)`);
            },
            mouseleave() {
                this.slideMouseContainer.style.setProperty('display', 'none');
            }
        }
    }
</script>

<template>
    <div id="slide__container">
        <router-link class="slide__control slide__control--left"
                     :to="{name: 'works', params: {name: slideLeft}}"
                     tag="div"
                     @mousemove.native="mousemove"
                     @mouseleave.native="mouseleave"
                     data-direction="left">
        </router-link>
        <router-link class="slide__control slide__control--right"
                     :to="{name: 'works', params: {name: slideRight}}"
                     tag="div"
                     @mousemove.native="mousemove"
                     @mouseleave.native="mouseleave"
                     data-direction="right">
        </router-link>

        <VClose :to="{name: 'home'}"></VClose>

        <!--<transition name="router-transition" mode="out-in" appear>-->
            <router-view></router-view>
        <!--</transition>-->

        <div id="slideControlContainer__mouse">
            <span class="slideControl__mouse"><</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./../../sass/mixins/mixins";

    #slide__container {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(42, 42, 42, .2);
        @include no-user-select();

        #slideControlContainer__mouse {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            cursor: none;
            @include no-pointer-events();

            .slideControl__mouse {
                display: block;
                color: #2a2a2a;
                font-size: 5em;
                transition: transform .4s $easeInOutQuint;
                @include no-pointer-events();
            }
        }

        .slide__control {
            position: absolute;
            top: 0;
            height: 100%;
            width: 50%;
            cursor: none;

            &--left {
                left: 0;
            }

            &--right {
                left: 50%;
            }
        }
    }
</style>