<template>
    <div class="page">
        <smm_navbar pageName="customising"/>
        <div class="page-pillow-type page-container">
            <div class="container pt-5 pb-5">
                <div class="child-container">
                    <div class="row">
                        <div class="col-6">
                            <router-link to="/front_image" class="text-center text-light">
                                <div class="opt-image" :class="!validate.frontImage ? '' : 'done'">
                                    <img v-if="!validate.frontImage" src="../../assets/menscam.png" alt="mens-cam">
                                    <img v-else src="../../assets/done.png" alt="done">
                                </div>
                                <p class="">Photo Measuring</p>
                            </router-link>
                        </div>
                        <div class="col-6">
                            <router-link to="/child_details" class="text-center text-light">
                                <div class="opt-image" :class="!validate.child_details ? '' : 'done'">
                                    <img v-if="!validate.child_details" src="../../assets/icon-weight.svg" alt="weight">
                                    <img v-else src="../../assets/done.png" alt="done">
                                </div>
                                <p class="">Child's details</p>
                            </router-link>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-6">
                            <router-link to="/child_bed_details" class="text-center text-light">
                                <div class="opt-image" :class="!validate.child_bed_details ? '' : 'done'">
                                    <img v-if="!validate.child_bed_details" src="../../assets/icon-bed.svg" alt="bed">
                                    <img v-else src="../../assets/done.png" alt="done">
                                </div>
                                <p class="">Bed Details</p>
                            </router-link>
                        </div>
                        <div class="col-6">
                            <router-link to="/child_health_issue" class="text-center text-light">
                                <div class="opt-image" :class="!validate.child_health_issue ? '' : 'done'">
                                    <img v-if="!validate.child_health_issue" src="../../assets/icon-issues.svg"
                                         alt="issues">
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
    </div>
</template>

<script>
    import smm_navbar from '../navbar.vue';
    import {saveMethods} from "../../provider/saveMethod";
    import {saveData} from "../../provider/savedataMixin";

    export default {
        name: "child_customise",
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
                this.validate = data.kid;
                let keys = Object.keys(data.kid);
                keys.forEach(val => this.validate[val] ? '' : this.disabledButton.push(val + " error"));
                this.notValid = false;
            } else {
                this.notValid = true;
            }

        },
        methods: {
            go() {
                if (this.disabledButton.length || this.notValid) {
                    this.message = 'Please Complete All Required Fields To Submit This Form';
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

<style lang="scss" scoped>
    @import "~bootstrap/scss/bootstrap";

    @include media-breakpoint-up(md) {
        .child-container {
            max-width: 400px;
            margin: 0 auto;
        }
    }

    .round-button button {
        padding: 35px 10px !important;
    }
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        .round-button button {
            padding: 38px 8px !important;
        }
    }
</style>
