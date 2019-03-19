<template>
    <div class="page">
        <smm_navbar pageName="bed-details"/>
        <div class="page-patient-details page-container">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Mattress</h5>
                                <div class="card-body  ">
                                    <div class="row align-items-baseline">
                                        <div class="col-2"><label>Base</label></div>
                                        <div class="col-6 pr-0">
                                            <div class="form-group">
                                                <input name="brand" class="form-control"
                                                       :disabled="disableBasename"
                                                       type="text" placeholder="brand"
                                                       @input="disabledontknow = !(brandName === '')"
                                                       v-model="brandName">
                                            </div>
                                        </div>
                                        <div class="col-4 pr-0">
                                            <div class="form-check custom-checkbox">
                                                <input class="form-check-input"
                                                       @change="disableBasename = $refs.unKnow.checked, brandName = ''"
                                                       type="checkbox"
                                                       value="unknow" id="unknow" ref="unKnow"
                                                       :disabled="disabledontknow" :checked="unknow">
                                                <label class="form-check-label donot-know" for="unknow">
                                                    Don't Know
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-baseline">
                                        <div class="col-6">
                                            <label>Matress age (years)</label>
                                        </div>
                                        <div class="col-6 pl-0">
                                            <div class="form-group">
                                                <input name="age" class="form-control" v-model="mattressAge"
                                                       type="number" placeholder="brand">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Does the mattress feel...</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="mattress-radio d-flex justify-content-between align-items-center">
                                                <span class="soft">SOFT</span>
                                                <div class="form-check mattress-form-check  pl-0" :class="'check' + i"
                                                     v-for="i in 8">
                                                    <input class="form-check-input" type="radio" name="feel"
                                                           :id="'feel' + i" :value="'feel' + i"
                                                           @change="feel = i"
                                                           :checked="i === feelChecked ? true : false">
                                                    <label class="form-check-label" :class="'labelfeel' + i"
                                                           :for="'feel' + i">
                                                    </label>
                                                </div>
                                                <span>HARD</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card card-height shadow-none mt-3 p-0">
                                <h5 class="card-header">Base/Overlay</h5>
                                <div class="card-body  ">
                                    <div class="row">
                                        <div class="col-4">
                                            <p>Type of base</p>
                                        </div>
                                        <div class="col-8">
                                            <div class="base-radio d-flex">
                                                <div class="form-check custom-radio">
                                                    <input class="form-check-input" type="radio"
                                                           name="base" id="slat" value="slat"
                                                           @change="baseNameMethod('slat')"
                                                           ref="slat" :disabled="disableBase"
                                                           :checked="baseChecked === 'slat'">
                                                    <label class="form-check-label" for="slat">
                                                        Slat
                                                    </label>
                                                </div>
                                                <div class="form-check custom-radio">
                                                    <input class="form-check-input" type="radio"
                                                           name="base" id="spring" value="spring"
                                                           @change="baseNameMethod('spring')"
                                                           ref="spring" :disabled="disableBase"
                                                           :checked="baseChecked === 'spring'">
                                                    <label class="form-check-label" for="spring">
                                                        Spring
                                                    </label>
                                                </div>
                                                <div class="form-check custom-radio">
                                                    <input class="form-check-input" type="radio"
                                                           name="base" id="latex" value="latex"
                                                           @change="baseNameMethod('latex')"
                                                           ref="latex" :disabled="disableBase"
                                                           :checked="baseChecked === 'latex'">
                                                    <label class="form-check-label" for="latex">
                                                        Latex
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input name="age" class="form-control" v-model="otherBase"
                                                       @input="disableBase = !(otherBase === ''), baseChecked = ''"
                                                       type="text" placeholder="Other (please details)"
                                                       :disabled="disableOtherBase">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8">
                                            <p>
                                                Does the mattress have pillow/<br/>comfort top or a type of overlay
                                            </p>
                                        </div>
                                        <div class="col-4">
                                            <div class="overlay-radio d-flex">
                                                <div class="form-check custom-radio">
                                                    <input class="form-check-input" type="radio"
                                                           name="comfort" id="yes" value="yes"
                                                           @change="comfort = 'yes'" :checked="comfort === 'yes'">
                                                    <label class="form-check-label yes" for="yes">

                                                    </label>
                                                </div>
                                                <div class="form-check custom-radio">
                                                    <input class="form-check-input" type="radio"
                                                           name="comfort" id="no" value="no"
                                                           @change="comfort = 'no'" :checked="comfort === 'no'">
                                                    <label class="form-check-label no" for="no">

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="round-button mt-5">
                                <div class="next submit-button submit-button p-0">
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
    import {saveMethods} from "../../provider/saveMethod";

    export default {
        name: "beddetails",
        components: {
            smm_navbar
        },
        data() {
            return {
                disableBasename: false,
                disabledontknow: false,
                baseName: '',
                disableBase: false,
                disableOtherBase: false,
                otherBase: '',
                mattressAge: '',
                feel: '',
                comfort: '',
                brandName: '',
                mattressDetails: {},
                message: '',
                unknow: false,
                feelChecked: false,
                baseChecked: ''
            }
        },
        methods: {
            back() {
                this.mattressDetails.mattressBrand = this.disableBasename ? 'Unkown' : this.brandName;
                this.mattressDetails.mattressAge = this.mattressAge;
                this.mattressDetails.mattressFeel = this.feel;
                this.mattressDetails.base = this.disableBase ? this.otherBase : this.baseName;
                this.mattressDetails.comfort = this.comfort;

                let isValidate = [];
                let keys = Object.keys(this.mattressDetails);
                keys.forEach(val => this.mattressDetails[val] === '' ? isValidate.push(val + ' error') : {});

                if (isValidate.length) {
                    this.message = "Enable fields are requried";
                    this.$refs.myModalRef.show();
                }
                else {
                    saveMethods.adult.bedDetails(this.mattressDetails);
                    saveMethods.setLocalStorage('beddetails', this.mattressDetails);
                    saveMethods.validateForm('bedDetails', 'adult');
                    this.$router.go(-1);
                }

            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            baseNameMethod(base) {
                this.disableOtherBase = true;
                this.baseName = base;
                this.otherBase = ''
            }
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('beddetails'));
            if (data) {
                this.mattressAge = data.mattressAge;
                this.comfort = data.comfort;
                this.feel = this.feelChecked = data.mattressFeel;

                data.mattressBrand === 'Unkown' ? (this.unknow = true, this.disableBasename = true) :
                    (this.brandName = data.mattressBrand, this.disabledontknow = true);

                let isOther = data.base === 'slat' || data.base === 'spring' || data.base === 'latex';
                if(isOther){
                    this.baseChecked = this.baseName = data.base;
                    this.disableOtherBase = true;
                }else{
                    this.disableBase = true;
                    this.otherBase = data.base;
                }
            }
        }
    }
</script>

<style scoped>
    .check1 {
        margin-left: -20px;
    }

    span {
        font-size: 12px;
    }

    .round-button button{
        padding: 35px 16px !important;
    }
</style>