<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        props: {
            alt: String,
            sizes: String,
            srcSet: String,
            classes: String,
            styles: String,
            src: String,
        }
    })
    export default class VImage extends Vue {
    }
</script>

<template>
    <picture>
        <source type="image/webp"
                v-if="/\.(png|jpe?g|gif)/gi.test(srcSet)"
                :class="classes"
                :srcset="srcSet.replace(/\.(png|jpe?g|gif)/gi, '.webp')"
                :sizes="sizes"
                :alt="alt"
                :style="styles">
        <img :src="src" :srcSet="srcSet" :sizes="sizes" :alt="alt"
             :class="classes"
             style="background-size: cover"
             :style="styles">
    </picture>
</template>