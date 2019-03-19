<template>
    <div class="page">
        <smm_navbar pageName="welcome"/>
        <div class="page-welcome page-container d-flex flex-column justify-content-around align-items-center">
            <div class="logo-image">
                <img src="../assets/logo.png" alt="logo-image">
            </div>
            <div class="footer">
                <p class="logo-text">Customise Your Pillow</p>
                <div class="round-button">
                    <router-link to="/customise">GO</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from './navbar.vue';

    export default {
        name: 'Welcome',
        components: {
            smm_navbar
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../scss/welcome";
</style>
