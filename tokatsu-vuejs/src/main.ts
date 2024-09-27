import './assets/style.scss'
import './assets/fontawesome/css/all.min.css'
import './assets/constante/constante.scss'
import 'vue3-carousel/dist/carousel.css'
import './assets/video/index.css';
import 'vue3-easy-data-table/dist/style.css';
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios/axios';
import i18n from './plugins/i18n/index';
import Notifications from '@kyvg/vue3-notification'
import { createVfm } from 'vue-final-modal'
import Vue3EasyDataTable from 'vue3-easy-data-table';

const app = createApp(App)

/* Axios */
axios.configuration();

app.use(i18n);
app.use(router);
app.use(Notifications);
app.use(createVfm());

app.component('EasyDataTable', Vue3EasyDataTable);

app.mount('#app')
