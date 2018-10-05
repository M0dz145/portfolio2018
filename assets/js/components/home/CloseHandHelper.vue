<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import BackspaceImage from '@img/backspace.svg'
    import DragImage from '@img/drag.svg'

    @Component({
        components: {
            BackspaceImage,
            DragImage
        }
    })
    export default class CloseHandHelper extends Vue {
    }
</script>

<template>
    <div class="closeHandHelper">
        <dragImage class="icon hand"/>
        <backspaceImage class="icon downArrow"/>
    </div>
</template>

<style lang="scss">
    @import "CloseHandHelper";
</style>
