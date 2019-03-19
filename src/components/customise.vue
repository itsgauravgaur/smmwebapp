<template>
    <div class="page">
        <smm_navbar pageName="customising"/>
        <div class="page-customise  page-container">
            <div class="desc">
                <p>
                    we custom design <br>
                    your pillow using <br>
                    the details you provide <br>
                    so we can match it to <br>
                    your specific needs. <br>
                </p>
                <p class="pt-5">
                    Please click the button <br>
                    below to answer a few <br> simple questions.
                </p>
            </div>

            <div class="round-button">
                <router-link to="/pillow_type">Customise</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from './navbar.vue';

    export default {
        name: "customise",
        components: {
            smm_navbar
        }
    }
</script>

<style lang="scss" scoped>
    .page-customise{
        text-align: center;
        padding: 100px 0;
        .desc{
            line-height: 25px;
            font-weight: 500;
        }
    }
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        .round-button{
            padding-top: 40px;
        }
    }
</style>
