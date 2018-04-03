<script>
    import RoundCursor from "@modules/animation/cursor/RoundCursor";

    export default {
        mounted() {
            new RoundCursor();
        }
    }
</script>

<template>
    <div id="cursor"></div>
</template>

<style lang="scss">
    @import "Cursor";
</style>