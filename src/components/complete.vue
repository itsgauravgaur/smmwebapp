<template>
    <div class="page">
        <smm_navbar pageName="complete"/>
        <div class="page-patient-details page-container justify-content-center">
            <div class="container">
                <div class="row m-0 flex-column justify-content-center align-items-center">
                    <div class="col-12 text-center">
                        <img src="../assets/logo.png" class="w-50" alt="logo">
                    </div>
                    <div class="col-12">
                        <div class="round-button mt-3">
                            <button @click="openTab">BUY NOW<br>ON<br>WEBSITE</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-5 text-center">
                        <router-link to="/" class="border p-4 text-white rounded bg-success">Start Again</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import smm_navbar from './navbar.vue';
    import {saveData} from "../provider/savedataMixin";

    export default {
        name: "complete",
        components: {
            smm_navbar
        },
        data() {
          return{
              f_name:'',
              l_name: '',
              email: ''
          }
        },
        methods: {
            openTab() {
                let url = "https://sleepmadetomeasure.com/checkout/?nord=1&clear=1&pr=145&f_name="+this.f_name+"&l_name="+this.l_name+"&email=" + this.email;
                window.open(url);
            }
        },
        created() {
            if(saveData.adultData.userType === ''){
                this.f_name = saveData.kidData.submitter.firstName;
                this.l_name = saveData.kidData.submitter.lastName;
                this.email = saveData.kidData.submitter.email
            }else{
                this.f_name = saveData.adultData.submitter.firstName;
                this.l_name = saveData.adultData.submitter.lastName;
                this.email = saveData.adultData.submitter.email
            }
        }
    }
</script>

<style lang="scss" scoped>
    .round-button {
        button {
            padding: 33px 32px !important;
            font-weight: 700;
        }
    }
</style>