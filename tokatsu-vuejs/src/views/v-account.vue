<template>
    <main v-if="loadedAccount">
        <div id="main">
            <h1>Vos informations personnelles</h1>

            <div class="infoPerso">
                    <label>Prénom : {{ connectedUser?.prenom }}</label>
                    <label>Nom : {{ connectedUser?.nom }}</label>
                    <label>Pseudo : {{ connectedUser?.pseudo }}</label>
                    <label>Email : {{ connectedUser?.email }}</label>
                    <label>Grade : {{ connectedUser?.permissions }}</label>
                    <div class="photo">
                        <span>Photo de profile : </span>
                        <img class="img-profile" :src="`https://gravatar.com/avatar/${emailMd5}`">
                        <a class="btn" href="https://fr.gravatar.com/" target="_blank" rel="noopener noreferrer">Modifier</a>
                    </div>
            </div>

            <br>
            <h1>Vos appareils connectés</h1>

            <div>
                <div>
                    <label class="mark">Nombre d'appreils connectés : {{ connectedUser?.numSession }}</label>
                </div>
            </div>

            <br>

            <h1>Se déconnecter</h1>
            <div>
                <div>
                    <button class="btn" @click="logout()" :disabled="clickLogout">{{ $t('login.logout') }}</button>
                    <button class="btn" @click="logoutAll()" :disabled="clickLogout">{{ $t('login.logoutAll') }}</button>  
                    <i v-if="clickLogout" class="fa-regular fa-spinner-third fa-spin"></i>                         
                </div>
            </div>

            <br>

            <h1>Supprimer votre compte</h1>
            <div>
                <div>
                    <button class="btn btn-danger" @click="deleteAccount()" :disabled="clickLogout">{{ $t('login.deleteAccount') }}</button>
                    <i v-if="clickLogout" class="fa-regular fa-spinner-third fa-spin"></i>                         
                </div>
            </div>
        </div>
        <c-modal-confirm
            v-model="showDeleteModal"
            title="Supprimer votre compte"
            @cancel="showDeleteModal = false"
            @confirm="confirmDeleteAccount"
        >
        </c-modal-confirm>

        <c-modal-confirm
            v-model="showLogoutAllModal"
            title="Se déconnecter de tous les appareils"
            @cancel="showLogoutAllModal = false"
            @confirm="confirmLogoutAll"
        >
        </c-modal-confirm>
    </main>
</template>

<script lang="ts">
import i18n from '@/plugins/i18n';
import httpAxios from '@/tools/http-axios';
import md5 from 'md5';
import cModalConfirm from '@/components/commun/c-modal-confirm.vue';

export default {
    name: 'v-account',
    components: {
        cModalConfirm,
    },
    props: {
        connectedUser: Object,
        loadedAccount: Boolean,
    },
    data() {
        return {
            emailMd5: '',
            clickLogout: false,
            showDeleteModal: false,
            showLogoutAllModal: false,
        }
    },
    watch: {
        loadedAccount() {
            if (this.loadedAccount) {
                if (!this.connectedUser) {
                    this.$router.push('/login');
                }
                else {
                    this.emailMd5 = md5(this.connectedUser?.email);
                }
            }
        }
    },
    mounted() {
        if (this.loadedAccount) {
            if (!this.connectedUser) {
                this.$router.push('/login');
            }
            else {
                this.emailMd5 = md5(this.connectedUser?.email);
            }
        }
    },
    methods: {
        logout() {
            this.clickLogout = true;
            httpAxios.post('http://localhost/logout', { token: document.cookie.split('=')[1] },
            (response: any) => {
                if (response.data.success) {
                    document.cookie = `token=; path=/; expires=${new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
                    window.location.href = '/';
                }
                else {
                    console.log(response.data.error);
                }
            },
            (error: any) => {
                this.clickLogout = false;
                console.log(error);
            });
        },

        logoutAll() {
            this.showLogoutAllModal = true;
        },
        confirmLogoutAll() {
            this.clickLogout = true;
            httpAxios.post('http://localhost/logoutAll', { token: document.cookie.split('=')[1] },
            (response: any) => {
                if (response.data.success) {
                    document.cookie = `token=; path=/; expires=${new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
                    window.location.href = '/';
                }
                else {
                    console.log(response.data.error);
                }
            },
            (error: any) => {
                this.clickLogout = false;
                console.log(error);
            });
        },

        deleteAccount() {
            this.showDeleteModal = true;
        },
        confirmDeleteAccount() {
            this.clickLogout = true;
            httpAxios.post('http://localhost/deleteAccount', { token: document.cookie.split('=')[1] },
            (response: any) => {
                if (response.data.success) {
                    document.cookie = `token=; path=/; expires=${new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toUTCString()}`;
                    this.$emit('connected', false);
                    this.$router.push('/');
                }
                else {
                    console.log(response.data.error);
                }
            },
            (error: any) => {
                this.clickLogout = false;
                console.log(error);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
@import "@/assets/account.scss";

.infoPerso {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin-bottom: 20px;
    
    label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        margin: 5px;
        background-color: $bgLabel;
        border-radius: 5px;
    }

    .photo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 5px;
        margin: 5px;
        background-color: $bgLabel;
        border-radius: 5px;

        span {
            margin: 0;
            padding: 0;
        }
        .btn {
            padding: 5px;
            margin: 5px;
            background-color: $bgLabel;
            border-radius: 5px;
            text-decoration: none;
            color: whit;
        }
    }
}
</style>