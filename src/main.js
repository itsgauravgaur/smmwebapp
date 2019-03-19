import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Popover from 'vue-js-popover';
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select';
import BootstrapVue from 'bootstrap-vue';
import vueTopprogress from 'vue-top-progress';

Vue.config.productionTip = false;

Vue.use(Popover);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(vueTopprogress);

Vue.component('v-select', vSelect);

Vue.filter('reverse', function (value) {
    return value.split('-').join(' ');
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
