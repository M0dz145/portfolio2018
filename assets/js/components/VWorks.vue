<script>
    import VClose from '@components/VClose';
    import VImage from '@components/VImage';
    import PiecesSlider from "@modules/animation/pieces/PiecesSlider";

    export default {
        mounted() {
            this.piecesSlider = new PiecesSlider(
                this.$el.querySelector('.pieces-slider__canvas'),
                [].slice.call(this.$el.querySelectorAll('.pieces-slider__image')),
                [].slice.call(this.$el.querySelectorAll('.pieces-slider__text'))
            );
        },
        components: {
            VClose,
            VImage
        },
        beforeDestroy() {
            this.piecesSlider.destroyEvents();
        },
        data() {
            return {
                works: [
                    {
                        name: 'Elkyos',
                        description: 'MMORPG médiéval fantastique, 2014',
                        image: require('@img/works/elkyos.jpg?placeholder=true&sizes[]=600,sizes[]=800')
                    },
                    {
                        name: '2',
                        description: 'testnsuerhuser, 4455',
                        image: require('@img/works/nicolasChevalier.jpg?placeholder=true&sizes[]=600,sizes[]=800')
                    },
                    {
                        name: '3',
                        description: 'azeazeaze, 5605640',
                        image: require('@img/works/immobilis.jpg?placeholder=true&sizes[]=600,sizes[]=800')
                    }
                ]
            };
        }
    }
</script>

<template>
    <div id="slide__container">
        <div class="pieces-slider">
            <div class="pieces-slider__slide" v-for="work in works">
                <img class="pieces-slider__image" :src="work.image.src" :alt="work.description">

                <div class="pieces-slider__text">{{ work.description.toUpperCase() }}</div>
            </div>

            <canvas class="pieces-slider__canvas"></canvas>
        </div>

        <VClose :to="{name: 'home'}"/>
    </div>
</template>

<style lang="scss" scoped>
    @import "~sass/components/Works.scss";
</style>