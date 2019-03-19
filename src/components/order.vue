<template>
    <div class="page">
        <vue-topprogress ref="topProgress"></vue-topprogress>
        <smm_navbar pageName="order"/>
        <div class="page-patient-details page-container">
            <div :class="overlay"></div>
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Order</h5>
                                <div class="card-body  ">
                                    <div class="form-group">
                                        <label class="label">Your First Name *</label>
                                        <input name="firstname" class="form-control"
                                               @input="$v.firstName.$touch()" v-model="firstName"
                                               type="text" placeholder="First name">
                                    </div>
                                    <div class="form-group">
                                        <label class="label">Your Last Name *</label>
                                        <input name="lastname" class="form-control"
                                               @input="$v.lastName.$touch()" v-model="lastName"
                                               type="text" placeholder="Last name">
                                    </div>
                                    <div class="form-group">
                                        <label class="label">Email *</label>
                                        <input name="email" class="form-control"
                                               @input="$v.email.$touch()" v-model="email"
                                               type="email" placeholder="Email">
                                    </div>
                                </div>
                            </div>
                            <div class="round-button mt-3">
                                <button type="button" :disabled="$v.$invalid" @click="save">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from './navbar.vue';
    import {required, email} from 'vuelidate/lib/validators';
    import {saveMethods} from "../provider/saveMethod";
    import {saveData} from "../provider/savedataMixin";
    import {endPoints} from "../api/endpoints";

    let url = "http://ec2-18-222-211-254.us-east-2.compute.amazonaws.com/smmmobilebackend/";
    // let url = "http://local.smm:8082/smmmobilebackend/";

    export default {
        name: "order",
        components: {
            smm_navbar
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                submit: {},
                overlay:'',
                userType: ''
            }
        },
        validations: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            email: {
                required,
                email
            }
        },
        methods: {
            async save() {
                this.$refs.topProgress.start();
                this.submit.firstName = this.firstName;
                this.submit.lastName = this.lastName;
                this.submit.email = this.email;
                this.overlay = 'add-overlay';

                await this.userType === 'kid' ? saveMethods.kid.submitData(this.submit) : saveMethods.adult.submitData(this.submit);
                await this.userType === 'kid' ? this.post(saveData.kidData) : this.post(saveData.adultData);

                 // this.post(saveData.adultData);
            },
            async post(data) {
                let axiosConfig = {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                };

                await fetch(url + endPoints.saveData, {
                    method: 'post',
                    headers: axiosConfig,
                    body: JSON.stringify(data)
                }).then(response => {
                    return response.json();
                }).then((data) => {
                    console.log('Request: ', data);
                    this.$refs.topProgress.done();
                    this.overlay = 'remove-overlay';
                    localStorage.clear();
                    this.$router.push('complete');
                }).catch((error) => {
                    console.log('Request failed', error);
                    this.$refs.topProgress.done();
                    this.overlay = 'remove-overlay';
                });


            }
        },
        created() {
            let data = JSON.parse(saveMethods.getLocalStorage('userType'));
            this.userType = data.userType;
            // console.log("usertype: ", this.userType,"\nkidData: ", saveData.kidData.userType,"\nadultData: ", saveData.adultData.userType);
        }
    }
</script>

<style scoped>

</style>