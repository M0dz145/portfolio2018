<script>
    import BirdsProvider from "./../components/birds/BirdsProvider";

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