<template>
  <header>
    <div>
      <router-link v-if="!shouldShowBackButton" to="/video" id="aLogo">
        <img id="logo" src="@/assets/logo.png" alt="logo-tokatsu">
      </router-link>
      <router-link v-if="shouldShowBackButton" to="#" @click="goBack" id="aLogo">
        <i class="fa-solid fa-arrow-left" style="color: #ffffff; cursor: pointer;" />
      </router-link>
    </div>
    <div><router-link to="/admin/serie" :class="{ active: isActive('/admin/serie') }">Gérer les séries</router-link></div>
    <div><router-link to="/admin/film" :class="{ active: isActive('/admin/film') }">Gérer les films</router-link></div>
    <!-- <div><router-link to="/admin/user" :class="{ active: isActive('/admin/user') }">Gérer les utilisateurs</router-link></div> -->
    <div>
      <span v-if="isEditingSerie" class="active">Modifier une série</span>
      <span v-else-if="isEditingFilm" class="active">Modifier un film</span>
      <span v-else-if="isAddingVideo" class="active">Ajouter un nouveau contenu</span>
      <span v-else-if="isAddingSerie" class="active">Ajouter un nouveau contenu</span>
      <span v-else-if="isAddingFilm" class="active">Ajouter un nouveau film</span>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "adm-admin-header",
  computed: {
    shouldShowBackButton() {
      return this.$route.path !== "/admin";
    },
    isEditingSerie() {
      return this.$route.path.includes("/admin/serie/edit");
    },
    isEditingFilm() {
      return this.$route.path.includes("/admin/film/edit");
    },
    isAddingVideo() {
      return this.$route.path.includes("/admin/video/add");
    },
    isAddingSerie() {
      return this.$route.path.includes("/admin/serie/add");
    },
    isAddingFilm() {
      return this.$route.path.includes("/admin/film/add");
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
