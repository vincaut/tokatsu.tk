import axios from 'axios';
import App from '../../App.vue';
import { notify } from "@kyvg/vue3-notification";
import router from '@/router';
import i18n from '../i18n';

declare const ENV_API_BASE_URL: string;

export default {
    configuration() {
        // Add a protoype to use axios everywhere
        //App.prototype.$http = axios;

        // Default http request URL
        // axios.defaults.baseURL = ENV_API_BASE_URL;

        // Auto add the 'application/json' to request header
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        // axios.interceptors.request.use((config) => {
        //     if (!config.url?.startsWith('http')) {
        //         // Add the Authorization header
        //         config.headers.Authorization = `Bearer ${this.getAccessToken()}`;
        //     }

        //     return config;
        // });

        // ajouter a chaque requete le token
        axios.interceptors.request.use((config) => {
            if (!config.url?.startsWith('http')) {
                // Add the Authorization header
                config.headers.Authorization = `Bearer ${this.getCookie('token')}`;
            }

            return config;
        });

        // Add a response interceptor
        axios.interceptors.response.use(
            (response) => {
                this.handleDates(response.data);
                return response;
            },
            (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        if (this.getCookie('token') !== -1) {
                            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                            router.push('/login');
                            notify({
                              title: i18n.global.t('session.expiredTitle'),
                              text: i18n.global.t('session.expiredMessage'),
                              type: 'error',
                            });
                        }
                        else {
                            router.push('/login');
                            notify({
                              title: i18n.global.t('session.expiredTitle'),
                              text: i18n.global.t('session.expiredMessage'),
                              type: 'error',
                            });
                        }
                    } else if (error.response.status === 403) {

                        notify({
                            type: 'error',
                            title: 'Error',
                            text: 'You do not have permission to access this resource.',
                        });
                    }
                return Promise.reject(error);
            }
        });
    },
    // getAccessToken() {
    //     const cookieToken: any = localStorage.getItem('gst.cm2at');

    //     if (cookieToken === null || cookieToken === undefined || cookieToken === '') {
    //         return '';
    //     }

    //     const parsedToken = JSON.parse(cookieToken);
    //     return parsedToken.AccessToken ? parsedToken.AccessToken : parsedToken.access_token ? parsedToken.access_token : '';
    // },
    // TODO: getCookie is never used
    getCookie(cname: string) {
        return document.cookie.indexOf(cname) !== -1 ? document.cookie.indexOf(cname) : '';
    },
    getParam(parameters: string) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has(parameters)) {
            return urlParams.get(parameters);
        }
        return '';
    },
    handleDates(body: any) {
        if (body === null || body === undefined || typeof body !== 'object') {
            return body;
        }

        Object.keys(body).forEach((key) => {
            const value = body[key];
            if (this.isIsoDateString(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object') {
                this.handleDates(value);
            }
        });
    },
    isIsoDateString(value: any): boolean {
        if (value && typeof value === 'string') {
            if (value.match(/^([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(.\d+)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?)?$/)) {
                return true;
            }
        }

        return false;
    }
};
