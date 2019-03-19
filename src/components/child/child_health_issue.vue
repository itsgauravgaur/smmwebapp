<template>
    <div class="page">
        <smm_navbar pageName="health-issue"/>
        <div class="page-patient-details page-container">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Sleeping Position</h5>
                                <div class="card-body  ">
                                    <p>Does the patient have issues with...</p>
                                    <div class="checkbox">
                                        <div class="form-check custom-checkbox">
                                            <input class="form-check-input" type="checkbox" value="neck"
                                                   id="neck" ref="neck"
                                                   @change="neckIssues = $refs.neck.checked"
                                                   :checked="neckIssues">
                                            <label class="form-check-label" for="neck">
                                                Neck
                                            </label>
                                        </div>
                                        <div class="form-check custom-checkbox">
                                            <input class="form-check-input" type="checkbox" value="spinal"
                                                   id="spinal" ref="spinal"
                                                   @change="spinalIssues = $refs.spinal.checked"
                                                   :checked="spinalIssues">
                                            <label class="form-check-label" for="spinal">
                                                Spinal
                                            </label>
                                        </div>
                                        <div class="form-check custom-checkbox">
                                            <input class="form-check-input" type="checkbox" value="shoulder"
                                                   id="shoulder" ref="shoulder"
                                                   @change="shoulderIssues = $refs.shoulder.checked"
                                                   :checked="shoulderIssues">
                                            <label class="form-check-label" for="shoulder">
                                                Shoulder
                                            </label>
                                        </div>
                                        <div class="form-check custom-checkbox">
                                            <input class="form-check-input" type="checkbox" value="sleeping"
                                                   id="sleeping" ref="sleep"
                                                   @change="sleepingIssues = $refs.sleep.checked"
                                                   :checked="sleepingIssues">
                                            <label class="form-check-label" for="sleeping">
                                                Sleeping
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group pt-4">
                                        <label for="comment">If so, please provide details</label>
                                        <textarea class="form-control" id="comment" rows="3" v-model="healthConditionDetails"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="round-button mt-5">
                                <div class="next submit-button submit-button">
                                    <button type="button" @click="back">SUBMIT</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import smm_navbar from '../navbar.vue';
    import {saveMethods} from "../../provider/saveMethod";

    export default {
        name: "child_health_issue",
        components: {
            smm_navbar
        },
        data() {
            return {
                neckIssues: false,
                shoulderIssues: false,
                sleepingIssues: false,
                spinalIssues: false,
                healthConditionDetails: '',
                healthDetails: {}
            }
        },
        methods: {
            back() {
                this.healthDetails.neckIssues = this.neckIssues;
                this.healthDetails.shoulderIssues = this.shoulderIssues;
                this.healthDetails.sleepingIssues = this.sleepingIssues;
                this.healthDetails.spinalIssues = this.spinalIssues;
                this.healthDetails.healthConditionDetails = this.healthConditionDetails;
                saveMethods.adult.healthDetails(this.healthDetails);
                saveMethods.setLocalStorage('healthIssue', this.healthDetails);
                saveMethods.validateForm('child_health_issue', 'kid');
                this.$router.go(-1);
            }
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('healthIssue'));
            if (data) {
                this.neckIssues = data.neckIssues;
                this.shoulderIssues = data.shoulderIssues;
                this.sleepingIssues = data.sleepingIssues;
                this.spinalIssues = data.spinalIssues;
                this.healthConditionDetails = data.healthConditionDetails;
            }
        }
    }
</script>

<style scoped>
    .submit-button{
        padding: 34px 8px !important;
    }
</style>