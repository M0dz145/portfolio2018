<script lang="ts">
    import VImage from '@components/common/image/VImage';
    import Component from "vue-class-component";
    import Vue from 'vue';

    @Component({
        props: {
            title: String,
            category: String,
            description: String,
            image: Object,
        },
        components: {
            VImage
        }
    })
    export default class VWork extends Vue {
    }
</script>

<template>
    <div class="work" :style="{backgroundImage: `url(${image.src})`}">
        <div class="work__overlay">
            <span class="work__text">{{ category }}</span>
        </div>
    </div>
</template>

<style lang="scss">
    @import "Work";
</style>