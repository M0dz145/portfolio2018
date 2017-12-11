<script>
    export default {
        props: ['alt', 'sizes', 'srcSet', 'src', 'classes', 'styles']
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
             :style="styles">
    </picture>
</template>