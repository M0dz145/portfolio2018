<script>
    export default {
        props: ['to']
    }
</script>

<template>
    <router-link :to="to" class="close">x</router-link>
</template>

<style lang="scss">
    @import "./../../sass/variables";

    .close {
        position: absolute;
        top: 20px;
        right: 40px;
        cursor: pointer;
        color: #2a2a2a;
        font-size: 2em;
        text-decoration: none;
        transition: transform .2s $easeOutCubic;

        &:hover {
            transform: scale(1.4);
        }
    }
</style>