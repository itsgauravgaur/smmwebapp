<template>
    <div class="page">
        <smm_navbar pageName="sleeping-habit"/>
        <div class="page-sleeping-habit page-container">
            <div class="container">
                <div class="row m-0">
                    <div class="col d-flex flex-column justify-content-center align-items-center">
                        <form class="d-flex flex-column">
                            <div class="card card-height shadow-none p-0">
                                <h5 class="card-header">Sleeping Position</h5>
                                <div class="card-body  ">
                                    <div class="form-check custom-radio">
                                        <input class="form-check-input" type="radio" name="position"
                                               id="side" value="side" v-model="position">
                                        <label class="form-check-label" for="side">
                                            Side
                                        </label>
                                    </div>
                                    <div class="form-check custom-radio">
                                        <input class="form-check-input" type="radio" name="position"
                                               id="back" value="back" v-model="position">
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
                            <div class="round-button mt-5">
                                <div class="next submit-button">
                                    <button type="button" @click="back" :disabled="$v.$invalid">SUBMIT</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {{$v.position}}
    </div>
</template>
<script>
    import smm_navbar from '../navbar.vue';
    import {required} from 'vuelidate/lib/validators';
    import {saveMethods} from "../../provider/saveMethod";

    export default {
        name: "sleepinghabit",
        components: {
            smm_navbar
        },
        data() {
            return {
                position: '',
                comments: '',
                sleepingHabitData: {}
            }
        },
        validations: {
            position: {
                required,
            },
        },
        methods: {
            back() {
                this.sleepingHabitData.habitPosition = this.position;
                this.sleepingHabitData.additionalComment = this.comments;
                saveMethods.adult.sleepingHabit(this.sleepingHabitData);
                saveMethods.setLocalStorage('sleepingHabit', this.sleepingHabitData);
                saveMethods.validateForm('sleepingHabits', 'adult');
                this.$router.go(-1);
            }
        },
        created() {
           let data = JSON.parse(saveMethods.getLocalStorage('sleepingHabit'));
           if(data){
               this.position = data.habitPosition;
               this.comments = data.additionalComment;
           }
        }
    }
</script>

<style scoped>
    .round-button button{
        padding: 35px 16px !important;
    }

</style>