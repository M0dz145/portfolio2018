<script>
    import VImage from '@components/VImage';
    import TiltFx from "@components/TiltFx";

    export default {
        data() {
            return {
                ElkyosImage: require('@img/works/nicolasChevalier.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
            };
        },
        mounted() {
            const TiltFxInstance = new TiltFx(document.getElementsByClassName('slide')[0], {
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
            VImage
        }
    }
</script>

<template>
    <div class="slide">
        <div class="panel">
            <div class="panelContainer__content">
                <div class="panel__content">
                    <div class="panel__text">
                        <h2 class="panel__title">Elkyos</h2>
                        <p class="panel__info">
                            MMORPG médiéval fantastique, 2014
                        </p>
                    </div>
                    <div class="panel__line"></div>
                    <router-link :to="{name: 'works'}" class="panel__link">En savoir plus</router-link>
                </div>
            </div>
            <div class="panelContainer__img">
                <VImage class="panel__img" :src="ElkyosImage.src" :srcSet="ElkyosImage.srcSet"
                        :styles="{backgroundImage: `url(${ElkyosImage.placeholder})`, width: '100%', height: '100%'}"
                        alt="Description"></VImage>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./../../sass/variables";
    @import "./../../sass/mixins/mixins";

    .slide {
        position: absolute;
        width: 100%;
        height: 100%;
        @include no-user-select();

        .panel {
            display: block;
            position: relative;
            top: 50%;
            left: 50%;
            width: 50%;
            max-width: 800px;
            height: 466px;
            transform: translate3d(-50%, -50%, 0);

            &:hover {
                .panelContainer__content {
                    .panel__content {
                        .panel__link {
                            opacity: 1;
                            transform: translate3d(0, 0, 0);
                            transition: transform .4s $easeOutCubic, opacity .4s $easeOutCubic;
                        }
                    }
                }
            }

            .panelContainer__content {
                .panel__content {
                    z-index: z(slidePanelContent);
                    position: absolute;
                    top: 26%;
                    left: -8%;
                    width: 115%;

                    .panel__text {
                        display: inline-block;
                        text-align: right;
                        color: white;

                        .panel__title {
                            font-size: 3em;
                            font-family: font-family(Aventura);
                            text-transform: uppercase;
                            text-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                        }

                        .panel__info {
                            position: relative;
                            margin: 16px 0 0;
                            text-shadow: 0 2px 8px rgba(0, 0, 0, .4);

                            &::before {
                                content: '';
                                display: inline-block;
                                margin: 9px 14px 0 0;
                                height: 1px;
                                width: 30px;
                                vertical-align: top;
                                background-color: white;
                            }
                        }
                    }

                    .panel__line {
                        margin: 24px 0 0 25%;
                        width: 75%;
                        height: 3px;
                        background-color: white;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                    }

                    .panel__link {
                        position: absolute;
                        margin-top: 10px;
                        right: 10%;
                        color: white;
                        opacity: 0;
                        font-size: 1.2em;
                        text-decoration: none;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                        transform: translate3d(0, -25px, 0);
                        transition: transform .4s $easeOutCubic, opacity .2s $easeOutCubic;
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
                    transform: translate3d(0, -25%, 0);
                    @include no-pointer-events();
                }
            }
        }
    }
</style>