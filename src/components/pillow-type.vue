<template>
    <div class="page">
        <smm_navbar pageName="pillow-type"/>
        <div class="page-pillow-type page-container">
            <div class="card">
                <div class="pillow-img">
                    <img src="../assets/regular.png" alt="regular-image">
                </div>
                <div class="next-button round-button">
                    <button type="button" @click="navigate('adult')">
                        <img src="../assets/left_arrowr.png" alt=" left-arrow">
                    </button>
                </div>
                <div class="content">
                    <h2>Regular</h2>
                    <p> The perfect pillow for neck support and comfort.</p>
                </div>
            </div>
            <div class="card">
                <div class="pillow-img">
                    <img src="../assets/travel.png" alt="travel-image">
                </div>
                <div class="next-button round-button">
                    <button type="button" @click="navigate('adult')">
                        <img src="../assets/left_arrowr.png" alt=" left-arrow">
                    </button>
                </div>
                <div class="content">
                    <h2>Travel</h2>
                    <p> A smaller pillow perfect for travelling.</p>
                </div>
            </div>
            <div class="card">
                <div class="pillow-img">
                    <img src="../assets/kids.png" alt="kids-image">
                </div>
                <div class="next-button round-button">
                    <button type="button" @click="navigate('kid')">
                        <img src="../assets/left_arrowr.png" alt=" left-arrow">
                    </button>
                </div>
                <div class="content">
                    <h2>Child's</h2>
                    <p> Suitable for 2 -12 years and under 50kg or 99 - 110lbs</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from './navbar';
    import {saveData} from "../provider/savedataMixin";
    import {saveMethods} from "../provider/saveMethod";

    export default {
        name: "pillow_type",
        components: {
            smm_navbar
        },
        methods: {
            navigate (type) {
                if(type === 'adult') {
                    saveData.adultData.userType = type;
                    this.$router.push('adult_customise');
                }
                else {
                    saveData.kidData.userType= type;
                    this.$router.push('child_customise');
                }
                saveMethods.setLocalStorage('userType',  {userType: type})
            }
        },
        beforeCreate(){
            localStorage.clear();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/pillow-type";
</style>