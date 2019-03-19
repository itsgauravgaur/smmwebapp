import {saveData} from "./savedataMixin";

export const saveMethods = {
    adult: {
        patient_details(data) {
            saveData.adultData.build = data;
        },
        sleepingHabit(data) {
            saveData.adultData.sleepingHabits = data;
        },
        bedDetails(data) {
            saveData.adultData.bedDetails = data;
        },
        healthDetails(data) {
            saveData.adultData.healthIssues = data;
        },
        submitData(data) {
            saveData.adultData.submitter = data;
        },
        frontImage(image) {
            saveData.adultData.measureShoulder = image;
        },
        sideImage(image) {
            saveData.adultData.assessPosture = image;
        }
    },
    kid: {
        buildDetails(data) {
            saveData.kidData.buildDetails = data;
        },
        bedDetails(data) {
            saveData.kidData.bedDetails = data;
        },
        healthDetails(data) {
            saveData.kidData.healthIssues = data;
        },
        submitData(data) {
            saveData.kidData.submitter = data;
        },
        frontImage(image) {
            saveData.kidData.image = image;
        }
    },
    setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    getLocalStorage(key) {
        return localStorage.getItem(key);
    },
    validateForm(key, type){
        type === 'adult' ? saveData.validateForm.adult[key] = true : saveData.validateForm.kid[key] = true;
        this.setLocalStorage('validate', saveData.validateForm);
    }
};