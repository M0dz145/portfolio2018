<script>
    import VImage from '@components/VImage';
    import TiltFx from "@components/TiltFx";

    export default {
        data() {
            return {
                ElkyosImage: require('@img/works/nicolasChevalier.jpg?sizes[]=200,sizes[]=600,sizes[]=800')
            };
        },
        mounted() {
            new TiltFx(document.getElementsByClassName('slide')[0]);
        },
        methods: {

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