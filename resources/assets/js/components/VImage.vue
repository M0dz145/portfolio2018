<script>
    export default {
        props: ['alt', 'sizes', 'srcSet', 'src', 'placeholder']
    }
</script>

<template>
    <picture>
        <source type="image/webp"
                v-if="/\.(png|jpe?g|gif)/gi.test(srcSet)"
                :srcset="srcSet.replace(/\.(png|jpe?g|gif)/gi, '.webp')"
                :sizes="sizes"
                :alt="alt"
                :style="placeholder ? {'background-image': `url(${placeholder})`} : null">
        <img :src="src" :srcSet="srcSet" :sizes="sizes" :alt="alt"
             :style="placeholder ? {'background-image': `url(${placeholder})`} : null">
    </picture>
</template>