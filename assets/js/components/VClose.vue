<script>
    import Clickable from '@directives/Clickable'

    export default {
        props: ['to'],
        directives: {
            Clickable
        }
    }
</script>

<template>
    <router-link v-clickable :to="to" class="close">x</router-link>
</template>

<style lang="scss">
    @import "~sass/components/Close.scss";
</style>