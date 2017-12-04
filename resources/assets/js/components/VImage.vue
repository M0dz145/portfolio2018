<template>
    <picture>
        <source type="image/webp"
                v-if="/\.(png|jpe?g|gif)/gi.test(srcSet)"
                :srcset="srcSet.replace(/\.(png|jpe?g|gif)/gi, '.webp')"
                :sizes="sizes"
                :alt="alt">
        <img :src="src" :srcSet="srcSet" :sizes="sizes" :alt="alt">
    </picture>
</template>

<script>
    export default {
        props: ['alt', 'sizes', 'srcSet', 'src']
    }
</script>