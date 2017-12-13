<script>
    import VImage from '@components/VImage';
    import TiltFx from "@components/TiltFx";

    export default {
        data() {
            return {
                ElkyosImage: require('@img/works/nicolasChevalier.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
            };
        },
        components: {
            VImage
        }
    }
</script>

<template>
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
                <div class="panelContainer__link">
                    <router-link :to="{name: 'works'}" class="panel__link">En savoir plus</router-link>
                </div>
            </div>
        </div>
        <div class="panelContainer__img">
            <VImage class="panel__img" :src="ElkyosImage.src" :srcSet="ElkyosImage.srcSet"
                    sizes="500px"
                    :styles="{backgroundImage: `url(${ElkyosImage.placeholder})`, minWidth: '100%', minHeight: '100%'}"
                    alt="Description"></VImage>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./../../sass/variables";
    @import "./../../sass/mixins/mixins";

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
                    .panel__text {
                        .panel__title, .panel__info {
                            transform: translate3d(0, 100px, 0);
                        }

                        .panel__title {
                            transition: transform .4s $easeOutCubic;
                        }

                        .panel__info {
                            transition: transform .4s $easeOutCubic .03s;

                            &::before {
                                opacity: 0;
                                transform: translate3d(150px, 0, 0);
                                transition: transform .2s $easeOutCubic, opacity .15s $easeOutCubic;
                            }
                        }
                    }

                    .panelContainer__link {
                        .panel__link {
                            transform: translate3d(0, -50px, 0);
                            transition: transform .4s $easeOutCubic;
                        }
                    }
                }
            }
        }

        .panelContainer__content {
            .panel__content {
                z-index: z(slidePanelContent);
                position: absolute;
                top: 25%;
                left: -8%;
                width: 115%;

                .panel__text {
                    display: inline-block;
                    text-align: right;
                    color: white;
                    overflow: hidden;
                    padding-bottom: 24px;

                    .panel__title {
                        font-size: 3em;
                        font-family: font-family(Aventura);
                        text-transform: uppercase;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                        transition: transform .4s $easeOutCubic;
                    }

                    .panel__info {
                        position: relative;
                        margin: 16px 0 0;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                        transition: transform .4s $easeOutCubic .2s;

                        &::before {
                            content: '';
                            display: inline-block;
                            margin: 9px 14px 0 0;
                            height: 1px;
                            width: 30px;
                            opacity: 1;
                            vertical-align: top;
                            background-color: white;
                            transition: transform .4s $easeOutCubic .3s, opacity .15s $easeOutCubic .4s;
                        }
                    }
                }

                .panel__line {
                    margin-left: 25%;
                    width: 75%;
                    height: 3px;
                    background-color: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                }

                .panelContainer__link {
                    position: absolute;
                    padding-top: 10px;
                    right: 10%;
                    overflow: hidden;

                    .panel__link {
                        display: inline-block;
                        color: white;
                        font-size: 1.2em;
                        text-decoration: none;
                        text-shadow: 0 2px 8px rgba(0, 0, 0, .4);
                        transition: transform .4s $easeOutCubic .4s;
                    }
                }
            }
        }

        .panelContainer__img {
            width: 100%;
            height: 100%;
            overflow: hidden;
            box-shadow: 0px 20px 100.28px 8.72px rgba(0, 0, 0, .35);

            .panel__img {
                @include no-pointer-events();
            }
        }
    }
</style>