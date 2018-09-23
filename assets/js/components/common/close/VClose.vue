<script>
    export default {
        props: ['to']
    }
</script>

<template>
    <router-link data-clickable :to="to" class="close">x</router-link>
</template>

<style lang="scss">
    @import "Close";
</style>