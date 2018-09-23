<script lang="ts">
    import RoundCursor from "@modules/animation/cursor/RoundCursor";
    import Component from "vue-class-component";
    import Vue from "vue";

    @Component({
        mounted(): void {
            new RoundCursor(this.$refs.customCursor);
        }
    })
    export default class VCursor extends Vue {
    }
</script>

<template>
    <div  class="dot" ref="customCursor">
        <svg viewBox="0 0 150 150" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813 50,75 C50,88.8071187 61.1928813,100 75,100 Z"></path>
        </svg>
    </div>
</template>

<style lang="scss">
    @import 'Cursor';
</style>