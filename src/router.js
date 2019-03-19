import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './components/welcome';
import customise from './components/customise';
import pillow_type from './components/pillow-type';
import adult_customise from './components/adult/adult_customise';
import child_customise from './components/child/child_customise';
import patient_details from './components/adult/Patient_details';
import sleepinghabit from './components/adult/sleepinghabit';
import healthdetails from './components/adult/healthdetails';
import beddetails from './components/adult/beddetails';
import order from './components/order';
import complete from './components/complete';
import front_image from './components/clickImage/front_image';
import image_view from './components/clickImage/image_view';
import side_image from './components/clickImage/side_image';
import child_bed_details from './components/child/child_bed_details';
import child_details from './components/child/child_details';
import child_health_issue from './components/child/child_health_issue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/customise',
            name: 'customise',
            component: customise
        },
        {
            path: '/pillow_type',
            name: 'pillow_type',
            component: pillow_type
        },
        {
            path: '/adult_customise',
            name: 'adult_customise',
            component: adult_customise,
            props: true
        },
        {
            path: '/child_customise',
            name: 'child_customise',
            component: child_customise,
            props: true
        },
        {
            path: '/patient_details',
            name: 'patient_details',
            component: patient_details,
            props: true
        },
        {
            path: '/sleepinghabit',
            name: 'sleepinghabit',
            component: sleepinghabit,
            props: true
        },
        {
            path: '/healthdetails',
            name: 'healthdetails',
            component: healthdetails,
            props: true
        },
        {
            path: '/beddetails',
            name: 'beddetails',
            component: beddetails,
            props: true
        },
        {
            path: '/order',
            name: 'order',
            component: order,
            props: true
        },
        {
            path: '/complete',
            name: 'complete',
            component: complete,
            props: true
        },
        {
            path: '/front_image',
            name: 'front_image',
            component: front_image,
            props: true
        },
        {
            path: '/image_view',
            name: 'image_view',
            component: image_view,
            props: true
        },
        {
            path: '/side_image',
            name: 'side_image',
            component: side_image,
            props: true
        },
        {
            path: '/child_bed_details',
            name: 'child_bed_details',
            component: child_bed_details,
            props: true
        },
        {
            path: '/child_details',
            name: 'child_details',
            component: child_details,
            props: true
        },
        {
            path: '/child_health_issue',
            name: 'child_health_issue',
            component: child_health_issue,
            props: true
        }
    ]
})