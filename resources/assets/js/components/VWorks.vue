<script>
    import VSlide from '@components/VSlide';
    import TiltFx from '@components/TiltFx';
    import VClose from '@components/VClose';

    export default {
        mounted() {
            this.slideMouseContainer = document.getElementById('slideControlContainer__mouse');
            this.slideMouse = this.slideMouseContainer.querySelector('.slideControl__mouse');
            console.log(this.slideMouse)

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
        components: {
            VSlide,
            VClose
        },
        methods: {
            slideTo(direction) {
                console.log(arguments)
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
        <div class="slide__control slide__control--left"
             @click="slideTo('left')"
             @mousemove="mousemove"
             @mouseleave="mouseleave"
             data-direction="left">
        </div>
        <div class="slide__control slide__control--right"
             @click="slideTo('right')"
             @mousemove="mousemove"
             @mouseleave="mouseleave"
             data-direction="right">
        </div>

        <VClose :to="{name: 'home'}"></VClose>
        <VSlide></VSlide>

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