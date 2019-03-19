<template>
    <div class="page">
        <smm_navbar pageName="patient-details"/>
        <div class="page-patient-details page-container">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Age</h5>
                                <div class="card-body  ">
                                    <div class="form-group">
                                        <label class="label">Patient's age</label>
                                        <input name="age" class="form-control" v-model="age"
                                               @input="$v.age.$touch()"
                                               type="number" placeholder="age">
                                    </div>
                                </div>
                            </div>
                            <div class="card card-height shadow-none mt-3 p-0">
                                <h5 class="card-header">Weight</h5>
                                <div class="card-body  ">
                                    <div class="form-group">
                                        <label class="label">Patient's weight</label>
                                        <div class="position-relative">
                                            <input name="age" class="form-control" v-model="kg"
                                                   @input="$v.kg.$touch()" @click.prevent="lbs = ''"
                                                   type="number" placeholder="kg">
                                        </div>
                                        <p>or</p>
                                        <div class="position-relative">
                                            <input name="age" class="form-control" v-model="lbs"
                                                   @input="$v.lbs.$touch()" @click.prevent="kg = ''"
                                                   type="number" placeholder="lbs">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="round-button mt-5">
                                <div class="next submit-button">
                                    <button type="button" @click="back">SUBMIT</button>
                                </div>
                            </div>
                        </form>

                        <div>
                            <b-modal ref="myModalRef" class="text-dark text-center" hide-footer
                                     title="Message">
                                <div class="d-block text-center text-dark">
                                    <h3>{{message}}</h3>
                                </div>
                                <b-button class="mt-3 ml-auto mr-auto btn w-25 text-center" variant="outline-danger"
                                          block @click="hideModal">Close
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
    import {required, maxValue, numeric} from 'vuelidate/lib/validators';
    import {saveMethods} from "../../provider/saveMethod";

    export default {
        name: "patient_details",
        components: {
            smm_navbar
        },
        data() {
            return {
                age: '',
                lbs: '',
                kg: '',
                message: '',
                buildData: {}
            }
        },
        validations: {
            age: {
                required,
                numeric,
                maxValue: maxValue(150)
            },
            kg: {
                required,
                numeric
            },
            lbs: {
                required,
                numeric
            }
        },
        methods: {
            back() {
                this.buildData.age = this.age;
                this.buildData.weightValue = this.lbs === '' ? this.kg : this.lbs;
                this.buildData.weightUnit = this.lbs === '' ? "kg" : "lbs";

                let isValidate = this.age !== '' && (this.kg !== '' || this.lbs !== '');
                if (isValidate) {
                    saveMethods.adult.patient_details(this.buildData);
                    saveMethods.setLocalStorage('build', this.buildData);
                    saveMethods.validateForm('patient_details', 'adult');
                    this.$router.go(-1);
                } else this.message = "Enable fields are requried";

                this.$refs.myModalRef.show();
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            }
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('build'));
            if (data) {
                this.age = data.age;
                data.weightUnit === "kg" ? this.kg = data.weightValue : this.lbs = data.weightValue;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .round-button button{
        padding: 33px 16px !important;
    }

</style>
