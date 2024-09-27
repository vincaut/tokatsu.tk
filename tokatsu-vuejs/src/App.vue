
<template>
  <div v-if="loaded">
    <div id="header">
      <header v-if="linkPath == '/'">
        <div><router-link to="/" id="aLogo"><img id="logo" src="@/assets/logo.png" alt="logo-tokatsu"></router-link></div>
        <div><router-link to="/video">Accéder au contenu vidéo</router-link></div>

        <div><a href="/assets/otherApp">Autres applications</a></div>

        <c-header-auth :connectedUser="connectedUser" :loadedAccount="loadedAccount"/>
      </header>
      <header v-else-if="linkPath == '/account'">
          <router-link to="/"><img id="logo" src="@/assets/logo.png" alt="logo-tokatsu"></router-link>

          <h1>Votre compte</h1>

          <router-link v-if="connectedUser?.permissions.includes('admin')" to="/admin">Administration</router-link>
          <div v-else></div>
      </header>
      <header v-else-if="linkPath == '/login'">
        <div><router-link to="/"><img id="logo" src="@/assets/logo.png" alt="logo-tokatsu"></router-link></div>

        <h1>{{ $t('Connexion') }}</h1>

        <div></div>
      </header>
      <CHeader
        v-else-if="showHeader"
        :connectedUser="connectedUser"
        :loadedAccount="loadedAccount"
      />
    </div>

    <RouterView v-slot="{ Component }"
      :connectedUser="connectedUser"
      :loadedAccount="loadedAccount"
      @connected="(n: boolean) => connected(n)"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <ModalsContainer/>

    <div
      id="loader"
      class="show"
      >
        <half-circle-spinner
          :animation-duration="1000"
          :rhombus-size="25"
          color="#b0f2b6"
        />
      </div>
    <footer id="footer">
      <p>© 2023 - Tokatsu</p>
    </footer>
  </div>

  <!-- <button @click="runModal()">
    OPEN
  </button> -->

  <notifications position="bottom right"/>
</template>

<script lang="ts">
import { ModalsContainer } from 'vue-final-modal'

import { HalfCircleSpinner  } from 'epic-spinners'
import { RouterView } from 'vue-router'
import httpAxios from './tools/http-axios';
import ConnectedUser from '@/DTO/ConnectedUser';
import CHeaderAuth from '@/components/header/c-header-auth.vue';
import CHeader from '@/components/includes/c-header.vue';
import { nextTick } from 'vue';

export default {
  name: 'App',
  components: {
    ModalsContainer,
    RouterView,
    HalfCircleSpinner ,
    CHeaderAuth,
    CHeader,
  },
  watch: {
    $route() {
      this.linkPath = this.$route.path;
    },
  },
  data() {
    return {
      connectedUser: null as ConnectedUser | null,
      loaded: false,
      loadedAccount: false,
      showHeader: true,
      linkPath: '',
    }
  },
  mounted() {
    if (document.cookie.indexOf('token') !== -1) {
      httpAxios.post('http://localhost/getDataUser', { token: document.cookie.split('=')[1] },
      (response: any) => {
        this.connectedUser = response.data as ConnectedUser;
        console.log(this.connectedUser);
        this.loadedAccount = true;
      },
      (error: any) => {
        this.connectedUser = null as unknown as ConnectedUser;
        this.loadedAccount = true;

        console.log(error);
      });
    }
    else {
      this.loadedAccount = true;
    }
    this.loaded = true;
  },
  methods: {
    connected(connected: boolean) {
      this.loadedAccount = false;
      if (connected) {
        httpAxios.post('http://localhost/getDataUser', { token: document.cookie.split('=')[1] },
        (response: any) => {
          this.connectedUser = response.data as ConnectedUser;
          this.loadedAccount = true;
        },
        (error: any) => {
          console.log(error);
          this.loadedAccount = true;
        });
      }
      else {
        this.connectedUser = null as unknown as ConnectedUser;
        this.loadedAccount = true;
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/constante/constante.scss';

#header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.fade-enter-active, .fade-leave-active {
  transition: 0.3s ease all;
}

.fade-enter-from, .fade-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

#loader {
  transition: 0.3s ease all;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index-loader;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &:not(.show) {
    opacity: 0;
    display: none;
  }
}
</style>

<style lang="scss" scoped>
</style>