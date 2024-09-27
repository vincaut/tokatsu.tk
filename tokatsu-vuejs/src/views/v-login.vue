<template>
    <main>
        <form>
            <div class="form-group">
            <h3>Connectez-vous</h3>

                <div class="form-group">
                    <label for="login">Identifiant ou E-mail</label>
                    <CInput type="text" v-model="user.id" class="form-control" placeholder="Votre pseudo"></CInput>

                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <CInput type="password" v-model="user.password" class="form-control" placeholder="Votre mot de passe" @keydown.enter="connect"></CInput>
                </div>
                <div class="dispositionButton">
                    <button type="button" class="btn btn-primary" @click="connect" :disabled="clickConnect"><span v-if="!clickConnect">Connexion</span> <i v-else class="fa-regular fa-spinner-third fa-spin"></i></button>
                    <router-link to="register"><span class="btn register">Inscription</span></router-link>
                </div>
            </div>
        </form>

    </main>
</template>

<script lang="ts">
import CInput from '@/components/commun/c-input.vue';
import httpAxios from '@/tools/http-axios';
import axios from '@/plugins/axios/axios';
import i18n from '@/plugins/i18n';
import ConnectedUser from '@/DTO/ConnectedUser';

export default {
    name: 'v-login',
    components: {
        CInput,
    },
    data() {
        return {
            user: {
                id: '',
                password: '',
            },
            status: '',
            timeOut: null,
            redirect: '' as string | null,
            clickConnect: false,
        }
    },
    props: {
        connectedUser: Object,

        loadedAccount: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        loadedAccount() {
            if (this.loadedAccount) {
                if (this.connectedUser) {
                    this.$router.push('/');
                }
            }
        },
    },
    mounted() {
        this.redirect  = axios.getParam('redirect');
    },
    methods: {
        connect() {
            this.clickConnect = true;
            httpAxios.post('http://localhost/login', this.user,
            (response) => {
                if (response.data.success) {
                    this.status = 'login.loginSuccess';
                    document.cookie = `token=${response.data.token}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString()}`;

                    this.$emit('connected', true);

                    if (this.redirect) {
                        this.$router.push(this.redirect);
                    }
                    else {
                        this.$router.push('/');
                    }
                }
                else {
                    this.clickConnect = false;
                    console.log(response.data.error);
                }
            }, (error) => {
                this.clickConnect = false;
                if (error.response.status === 400) {
                    this.$notify({
                        title: 'Oops',
                        text: i18n.global.t('login.idOrPasswordIncorrect'),
                        type: 'error',
                    });
                }
                else {
                    this.$notify({
                        title: 'Oops',
                        text: i18n.global.t('error'),
                        type: 'error',
                    });
                }
            });
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/bootstrap/bootstrap.min.css';
@import '../assets/login.scss';
</style>
