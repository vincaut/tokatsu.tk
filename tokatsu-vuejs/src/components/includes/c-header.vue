<template>
    <header>
        <div>
            <router-link v-if="linkPath == '/video'" to="/" id="aLogo"><img id="logo" src="@/assets/logo.png" alt="logo-tokatsu"></router-link>
            <router-link v-else to="/video" ><i class="fa-solid fa-arrow-left" style="color: #ffffff; cursor: pointer;"></i></router-link>
        </div>

        <!-- //TODO: lien active en surbrillance -->
        <div><router-link to="/video/serie">Séries</router-link></div>
        <div><router-link to="/video/film">Films</router-link></div>
        <!-- <div>
            <select name="Choix" onchange="document.location.href=this.options[this.selectedIndex].value">
            <option selected>Catégories</option>
            <option value="/video/serie">CHOIX 1</option>
            <option value="/">CHOIX 2</option>
            </select>
        </div> -->

        <CHeaderAuth :connectedUser="connectedUser" :loadedAccount="loadedAccount"/>
    </header>
</template>

<script lang="ts">
import CHeaderAuth from '@/components/header/c-header-auth.vue';
import { set } from 'lodash';
import { nextTick } from 'vue';

export default {
    name: 'c-header',
    components: {
        CHeaderAuth,
    },
    props: {
        connectedUser: Object,

        loadedAccount: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            linkPath: ''
        }
    },
    watch: {
        $route() {
            this.linkPath = this.$route.path;
        },
    },
    mounted() {
        this.linkPath = this.$route.path;
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.router-link-active {
    color: rgb(255, 147, 97);
}
</style>