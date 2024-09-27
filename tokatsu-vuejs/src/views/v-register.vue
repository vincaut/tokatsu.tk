<template>
    <main>
        <header>
            <div><router-link to="/"><img id="logo" src="@/assets/logo.png" alt="logo-tokatsu"></router-link></div>

            <p></p>
            <div>
                <h1>{{ $t('Inscription') }}</h1>
                <p id="status">{{ $t(status) }}</p>
            </div>
            <p></p>
            <p></p>
        </header>

    <form>
        <div class="form-group">
            <h3>Inscrivez-vous</h3>
            <div class="form-group">
                <label for="login">Nom (facultatif)</label>
                <CInput type="text" class="form-control" v-model="user.nom" placeholder="Votre nom" />

                <label for="login">Prénom (facultatif)</label>
                <CInput type="text" class="form-control" v-model="user.prenom" placeholder="Votre prénom" />

                <label for="login">Pseudo</label>
                <CInput type="text" class="form-control" v-model="user.pseudo" placeholder="Votre pseudo" />

                <label for="login">E-mail</label>
                <CInput type="text" class="form-control" v-model="user.email" placeholder="Votre E-mail" />

                <label for="password">Mot de passe</label>
                <CInput type="password" class="form-control" v-model="user.password" placeholder="Votre mot de passe"/>

                <label for="password">Confirmation du mot de passe</label>
                <CInput type="password" class="form-control" v-model="user.password2" placeholder="Confirmez votre mot de passe"/>
            </div>
            <div class="dispositionButton">
                <button type="button" class="btn btn-primary" @click="register">Inscription</button>
                <router-link to="login"><span class="btn login">Connexion</span></router-link>
            </div>
        </div>
    </form>

    </main>
</template>

<script lang="ts">
import CInput from '@/components/commun/c-input.vue';
import httpAxios from '@/tools/http-axios';
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
                nom: '',
                prenom: '',
                pseudo: '',
                email: '',
                password: '',
                password2: '',
            },
            status: '',
            timeOut: null,
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
    methods: {
        register() {
            this.clickConnect = true;
            httpAxios.post('http://localhost/register', this.user,
            (response) => {
                if (response.data.success) {
                    this.status = 'login.loginSuccess';
                    document.cookie = `token=${response.data.token}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString()}`;

                    this.$emit('connected', true);

                    this.$router.push('/');
                }
                else {
                    this.clickConnect = false;
                    console.log(response.data.error);
                }
            }, (error) => {
                this.clickConnect = false;
                if (error.response.status === 400) {
                    if (error.response.data.error === 'WRONG EMAIL') {
                        this.$notify({
                            title: 'Oops',
                            text: i18n.global.t('login.emailInvalid'),
                            type: 'error',
                        });

                    }
                    else if (error.response.data.error === 'EMAIL ALREADY USED') {
                        this.$notify({
                            title: 'Oops',
                            text: i18n.global.t('login.emailAlreadyUse'),
                            type: 'error',
                        });

                    }
                    else if (error.response.data.error === 'PSEUDO ALREADY USED') {
                        this.$notify({
                            title: 'Oops',
                            text: i18n.global.t('login.pseudoAlreadyUse'),
                            type: 'error',
                        });

                    }
                    else if (error.response.data.error === 'PASSWORDS ARE DIFFERENT') {
                        this.$notify({
                            title: 'Oops',
                            text: i18n.global.t('login.passwordDiff'),
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
