<template>
    <div>
        <div v-if="!loadedAccount">
            <i class="fa-regular fa-spinner-third fa-spin"></i>        </div>
        <div v-else-if="!connectedUser">
            <router-link to="/login">{{ $t('login.askLogin') }}</router-link>
        </div>
        <div v-else>
            <div class="accountName">
                <router-link to="/account" >
                    <span>{{ connectedUser?.prenom }} - {{ connectedUser.pseudo }}</span>
                    <img class="img-profile" :src="`https://gravatar.com/avatar/${emailMd5}`" alt="">
                </router-link>
            </div>
            <div class="accountNone">
                <router-link to="/account" >
                    <span>{{ $t('myAccount') }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import md5 from 'md5';

export default {
    name: 'c-header-auth',
    components: {
    },
    props: {
        connectedUser: Object,
        loadedAccount: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            emailMd5: '',
        }
    },
    watch: {
        connectedUser: function (val) {
            if (val) {
                this.emailMd5 = md5(val.email);
            }
        }
    },
    mounted() {
        if (this.connectedUser) {
            this.emailMd5 = md5(this.connectedUser.email);
        }
    },
    methods: {
        md5: function (str: string) {
            return str;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
