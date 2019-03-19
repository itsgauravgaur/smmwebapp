<template>
    <div class="page">
        <smm_navbar pageName="child-details"/>
        <div class="page-patient-details page-container">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Age/Height/Weight</h5>
                                <div class="card-body  ">
                                    <div class="row align-items-baseline">
                                        <div class="col-3">
                                            Age
                                        </div>
                                        <div class="col-9">
                                            <v-select v-model="age" placeholder="year (select)"
                                                      :options="['2','3','4','5','6','7','8','9','10','11','12']"></v-select>
                                        </div>
                                    </div>
                                    <div class="row align-items-baseline mt-2">
                                        <div class="col-3">
                                            Height
                                        </div>
                                        <div class="col-9">
                                            <div class="form-group mb-2">
                                                <input name="height" class="form-control" v-model="kidHeight"
                                                       type="number" placeholder="Height">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-baseline">
                                        <div class="col-3">
                                            Weight
                                        </div>
                                        <div class="col-9">
                                            <div class="row align-items-baseline">
                                                <div class="col-5">
                                                    <div class="position-relative">
                                                        <input name="age" class="form-control" v-model="kg"
                                                               @click.prevent="disableField('kg')"
                                                               type="number" placeholder="kg" :disabled="disableKg">
                                                        <div class="position-absolute w-100 h-100"
                                                             style="top:0; left:0;"
                                                             :style="disableKg ? style : disableCss"
                                                             @mouseover="enable('kg')"></div>
                                                    </div>
                                                </div>
                                                <div class="col-2 text-center p-0">or</div>
                                                <div class="col-5">
                                                    <div class="position-relative">
                                                        <input name="age" class="form-control" v-model="lbs"
                                                               @click.prevent="disableField('lbs')"
                                                               type="number" placeholder="lbs" :disabled="disableLbs">
                                                        <div class="position-absolute w-100 h-100"
                                                             style="top:0; left:0;"
                                                             :style="disableLbs ? style : disableCss"
                                                             @mouseover="enable('lbs')"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card card-height shadow-none  p-0">
                                <h5 class="card-header">Sleeping Position</h5>
                                <div class="card-body  ">
                                    <div class="form-check custom-radio">
                                        <input class="form-check-input" type="radio" name="position"
                                               id="side" value="side" v-model="habit">
                                        <label class="form-check-label" for="side">
                                            Side
                                        </label>
                                    </div>
                                    <div class="form-check custom-radio">
                                        <input class="form-check-input" type="radio" name="position"
                                               id="back" value="back" v-model="habit">
                                        <label class="form-check-label" for="back">
                                            Back
                                        </label>
                                    </div>
                                    <div class="form-group pt-4">
                                        <label for="comment">Additional Information</label>
                                        <textarea class="form-control" v-model="comments" id="comment"
                                                  rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="round-button mt-3">
                                <button type="button" class="next submit-button" @click="goBack">SUBMIT</button>
                            </div>
                        </form>
                        <div>

                            <b-modal ref="myModalRef" class="text-dark text-center" hide-footer
                                     title="Message">
                                <div class="d-block text-center text-dark">
                                    <h3>{{message}}</h3>
                                </div>
                                <b-button class="mt-3 ml-auto mr-auto btn w-25 text-center modal-button text-danger"
                                          variant="outline-danger" block @click="hideModal">Close
                                </b-button>
                            </b-modal>
                        </div>
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
        name: "child_details",
        components: {
            smm_navbar
        },
        data() {
            return {
                kidHeight: '',
                weightValue: '',
                weightUnit: '',
                age: '',
                habit: '',
                comments: '',
                kg: '',
                lbs: '',
                disableKg: false,
                disableLbs: false,
                style: {
                    "z-index": "0"
                },
                disableCss: {
                    "z-index": "-100"
                },
                message: '',
                kidData: {}
            }
        },
        methods: {
            goBack: function () {
                this.weightValue = this.kg === '' ? this.lbs : this.kg;
                this.weightUnit = this.kg === '' ? 'lbs' : 'kg';

                this.kidData.kidHeight = this.kidHeight;
                this.kidData.weightValue = this.weightValue;
                this.kidData.weightUnit = this.weightUnit;
                this.kidData.age = this.age;
                this.kidData.habit = this.habit;
                this.kidData.comments = this.comments;

                let isValidate = [];
                let keys = Object.keys(this.kidData);
                keys.forEach(val => this.kidData[val] === '' ? isValidate.push(val + ' error') : {});

                if (isValidate.length) {
                    this.message = "Enable fields are requried";
                    this.$refs.myModalRef.show();
                }
                else {
                    saveMethods.kid.buildDetails(this.kidData);
                    saveMethods.setLocalStorage('child_details', this.kidData);
                    saveMethods.validateForm('child_details', 'kid');
                    this.$router.go(-1)

                }
            },
            disableField(unit) {
                this.disable(unit);
                unit === 'kg' ? this.lbs = '' : this.kg = '';
            },
            enable(e) {
                this.disable(e);
            },
            disable(value) {
                if (value === 'kg') {
                    this.disableKg = false;
                    this.disableLbs = true;
                } else {
                    this.disableKg = true;
                    this.disableLbs = false;
                }
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            }
        }
    }
</script>

<style scoped>

    .submit-button {
        padding: 34px 8px !important;
    }

    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        .submit-button {
            padding: 30px 8px !important;
        }

        .vs__actions {
            margin-left: -30px;
        }
    }

</style>
