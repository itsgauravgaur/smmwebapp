export const saveData = {
    adultData: {
        userType: '',
        measureShoulder: '',
        assessPosture: '',
        submitter: {},
        bedDetails: {},
        build: {},
        healthIssues: {},
        sleepingHabits: {}
    },
    kidData: {
        image: '',
        userType: '',
        submitter: {},
        bedDetails: {},
        buildDetails: {},
        healthIssues: {}
    },
    validateForm:{
        adult:{
            bedDetails: false,
            healthDetails: false,
            patient_details: false,
            sleepingHabits: false,
            frontImage: false,
            sideImage: false
        },
        kid: {
            frontImage: false,
            child_details: false,
            child_bed_details: false,
            child_health_issue: false
        }
    },
    imagePosition: ""
};