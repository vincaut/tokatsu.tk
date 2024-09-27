/* eslint-disable no-prototype-builtins */
import router from '@/router';
import axios from 'axios';

const httpAxios = {
    post(url: any, dataObject: any, onSuccess: (arg0: any) => void, onError: (arg0: any) => void) {
        const formData = new FormData();

        for (const key in dataObject) {
            if (dataObject.hasOwnProperty(key)) {
                formData.append(key, dataObject[key]);
            }
        }

        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
        });
    },
    get(url: any, onSuccess: (arg0: any) => void, onError: (arg0: any) => void) {
        axios({
            method: 'get',
            url: url,
        })
        .then((response) => {
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response);
            }
        })
        .catch((error) => {
            if (onError && typeof onError === 'function') {
                onError(error);
            }
        });
    },

    redirectLogin() {
        router.push('/login?redirect=' + router.currentRoute.value.path);
    }
}

export default httpAxios;