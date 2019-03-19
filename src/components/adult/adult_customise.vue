<template>
    <div class="page">
        <smm_navbar pageName="customising"/>
        <div class="page-pillow-type page-container">
            <!--   {{type}}-->
            <div class="container pt-5 pb-5">
                <div class="row">
                    <div class="col-6 col-md-4">
                        <router-link to="/front_image" class="text-center text-light">
                            <div class="opt-image" :class="!validate.frontImage ? '' : 'done'">
                                <img v-if="!validate.frontImage" src="../../assets/menscam.png" alt="mens-cam">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Measure Face On</p>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-4">
                        <router-link to="/side_image" class="text-center text-light">
                            <div class="opt-image" :class="!validate.sideImage ? '' : 'done'">
                                <img v-if="!validate.sideImage" src="../../assets/side.png" alt="side-cam">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Measure Profile</p>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-4">
                        <router-link to="/patient_details" class="text-center text-light">
                            <div class="opt-image" :class="!validate.patient_details ? '' : 'done'">
                                <img v-if="!validate.patient_details" src="../../assets/icon-weight.svg" alt="weight">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Patient's Details</p>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-4 d-md-none">
                        <router-link to="/sleepinghabit" class="text-center text-light">
                            <div class="opt-image" :class="!validate.sleepingHabits ? '' : 'done'">
                                <img v-if="!validate.sleepingHabits" src="../../assets/icon-sleep.svg" alt="sleep">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Sleeping Habits</p>
                        </router-link>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-6 col-md-4 d-none d-md-block">
                        <router-link to="/sleepinghabit" class="text-center text-light">
                            <div class="opt-image" :class="!validate.sleepingHabits ? '' : 'done'">
                                <img v-if="!validate.sleepingHabits" src="../../assets/icon-sleep.svg" alt="sleep">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Sleeping Habits</p>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-4">
                        <router-link to="/beddetails" class="text-center text-light">
                            <div class="opt-image" :class="!validate.bedDetails ? '' : 'done'">
                                <img v-if="!validate.bedDetails" src="../../assets/icon-bed.svg" alt="bed">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Bed Details</p>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-4">
                        <router-link to="/healthdetails" class="text-center text-light">
                            <div class="opt-image" :class="!validate.healthDetails ? '' : 'done'">
                                <img v-if="!validate.healthDetails" src="../../assets/icon-issues.svg" alt="issues">
                                <img v-else src="../../assets/done.png" alt="done">
                            </div>
                            <p class="">Health Details</p>
                        </router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <div class="round-button">
                            <div class="next submit-button p-0 submit-button">
                                <button type="button" @click="go()">Customise</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                    <b-modal ref="myModalRef" class="text-dark text-center" hide-footer
                             title="Message">
                        <div class="d-block text-center text-dark">
                            <h3>{{message}}</h3>
                        </div>
                        <b-button class="mt-3 ml-auto mr-auto btn w-25 text-center text-danger modal-button"
                                  variant="outline-danger"
                                  block @click="hideModal">Close
                        </b-button>
                    </b-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from '../navbar.vue';
    import {saveMethods} from "../../provider/saveMethod";
    import {saveData} from "../../provider/savedataMixin";

    export default {
        name: "adult_customise",
        data() {
            return {
                type: this.$route.params.name,
                validate: {},
                disabledButton: [],
                message: '',
                notValid: false
            }
        },
        components: {
            smm_navbar
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('validate'));

            if (data) {
                this.validate = data.adult;
                let keys = Object.keys(data.adult);
                keys.forEach(val => this.validate[val] ? '' : this.disabledButton.push(val + "error"));
                this.notValid = false;
            } else {
                this.notValid = true;
            }

        },
        methods: {
            go() {
                if (this.disabledButton.length || this.notValid) {
                    this.message = 'Please Complete All Required Fields To Submit This Form'
                    this.$refs.myModalRef.show()
                } else {
                    this.$router.push('order');
                }

            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
        }
    }
</script>

<style scoped>

    .round-button button {
        padding: 35px 10px !important;
    }

    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        .round-button button {
            padding: 38px 8px !important;
        }
    }

</style>
