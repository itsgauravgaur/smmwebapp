<template>
    <div class="nav-ctrl position-relative">
        <nav :class="pageName ">
            <div class="nav-container d-flex align-items-start">
                <div class="back">
                    <button class="back-button" @click="$router.go(-1)">
                        <img src=../assets/left-arrow.png alt="back-image">
                    </button>
                </div>
                <div class="page-title">{{pageName | reverse}}</div>
                <div class="popover">
                    <button v-popover:foo class="popover-btn">
                    </button>
                </div>
            </div>
        </nav>
        <popover_modal/>
    </div>
</template>

<script>
    import popover_modal from './popover'
    import Popover from 'vue-js-popover'

    export default {
        name: "smm_navbar",
        components: {
            popover_modal
        },
        props: {
            pageName: String
        },
        computed: {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/navbar";
</style>
