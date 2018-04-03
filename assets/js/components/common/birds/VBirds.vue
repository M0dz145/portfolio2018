<script>
    import BirdsProvider from "@modules/bird/BirdsProvider";

    export default {
        mounted() {
            const birdsProviderInstance = new BirdsProvider(document.getElementById('birds'));
            birdsProviderInstance.init();
        }
    }
</script>

<template>
    <div id="birds"></div>
</template>

<style lang="scss" scoped>
    @import "Birds";
</style>