<template>
    <div id="app">
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Welcome from './components/welcome';
    import smm_navbar from './components/navbar';
    import customise from './components/customise';
    import pillow_type from './components/pillow-type';
    import popover from './components/popover';
    import adult_customise from './components/adult/adult_customise';
    import child_customise from './components/child/child_customise';
    import patient_details from './components/adult/Patient_details';
    import sleepinghabit from './components/adult/sleepinghabit';
    import healthdetails from './components/adult/healthdetails'
    import beddetails from './components/adult/beddetails';
    import order from './components/order';
    import complete from './components/complete';
    import front_image from './components/clickImage/front_image';
    import image_view from './components/clickImage/image_view';
    import side_image from './components/clickImage/side_image';
    import child_bed_details from './components/child/child_bed_details';
    import child_details from './components/child/child_details';
    import child_health_issue from './components/child/child_health_issue';

    export default {
        name: 'app',
        components: {
            Welcome,
            smm_navbar,
            customise,
            pillow_type,
            adult_customise,
            child_customise,
            popover,
            patient_details,
            sleepinghabit,
            healthdetails,
            beddetails,
            order,
            complete,
            front_image,
            image_view,
            side_image,
            child_bed_details,
            child_details,
            child_health_issue
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
    @import "~bootstrap-vue/src/index.scss";
    @import "scss/mixins";
    @import "scss/style.scss";
</style>
