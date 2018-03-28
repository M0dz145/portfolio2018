<script>
    export default {
        props: ['to']
    }
</script>

<template>
    <router-link :to="to" class="close">x</router-link>
</template>

<style lang="scss">
    @import "~sass/components/Close.scss";
</style>