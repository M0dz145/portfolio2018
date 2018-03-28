<script>
    import VImage from '@components/VImage';

    export default {
        mounted() {

        },
        data() {
            return {
                slide: {
                    name: 'Elkyos',
                    description: 'MMORPG médiéval fantastique, 2014',
                    image: require('@img/works/elkyos.jpg?placeholder=true&sizes[]=200,sizes[]=600,sizes[]=800')
                }
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
                    <h2 class="panel__title">{{ slide.name }}</h2>
                    <p class="panel__info">
                        {{ slide.description }}
                    </p>
                </div>
                <div class="panel__line"></div>
                <div class="panelContainer__link">
                    <router-link :to="{name: 'works'}" class="panel__link">En savoir plus</router-link>
                </div>
            </div>
        </div>
        <div class="panelContainer__img">
            <VImage class="panel__img" :src="slide.image.src"
                    v-if="slide"
                    :srcSet="slide.image.srcSet"
                    sizes="500px"
                    :styles="{backgroundImage: `url(${slide.image.placeholder})`, minWidth: '100%', minHeight: '100%'}"
                    alt="Description"></VImage>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~sass/components/Slide.scss";
</style>