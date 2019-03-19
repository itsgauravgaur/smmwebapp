<template>
    <div class="page">
        <smm_navbar pageName="photo-measuring"/>
        <div class="page-patient-details page-container ">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column  align-items-center">
                        <div class="card card-height shadow-none p-0 mb-5">
                            <h5 class="card-header">Front On Image</h5>
                            <div class="card-body">
                                <div class="camera-logo">
                                    <img src="../../assets/camera.png" alt="camera">
                                </div>
                                <p>Take a front on photo of the <br> patient's head and shoulders.</p>
                                <div class="demo-bg-color">
                                    <div class="row ">
                                        <div class="col-5 px-0">
                                            <img class="w-75" src="../../assets/sideimg.png" alt="sideimg">
                                        </div>
                                        <div class="col-7 pl-0 align-self-center">
                                            <p style="margin-bottom: 4px">Your subject should<br>be shown
                                                in your profile.
                                            </p>
                                            <p class="mb-0">
                                                Use this illustration as<br>your guide for distance <br>
                                                and postion.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="round-button mt-5">
                            <router-link class="next" to="/image_view">NEXT</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from '../navbar.vue';
    import {saveData} from "../../provider/savedataMixin";

    export default {
        name: "side_image",
        components: {
            smm_navbar
        },
        created() {
            saveData.imagePosition = 'side';
        }
    }
</script>

<style scoped>
    a {
        padding: 32px 16px !important;
    }
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        a {
            padding: 28px 14px !important;
        }
    }
</style>
