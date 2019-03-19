<template>
    <popover name="foo">
        <div class="language-header">
            Language
        </div>
        <hr>
        <div class="language-list">
            English
        </div>
    </popover>
</template>

<script>
    export default {
        name: "popover_modal"
    }
</script>

<style lang="scss" scoped>
    .language-header {
        color: #000000;
        font-weight: 500;
        font-size: 18px;
        padding: 10px;
    }

    hr {
        margin: 0;
    }

    .language-list {
        color: #000000;
        padding: 10px;
        cursor: pointer;
    }

</style>