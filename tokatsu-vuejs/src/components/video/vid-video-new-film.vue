<!-- eslint-disable no-irregular-whitespace -->
<template>
    <div>
        <h1>Nouveau film :</h1>
        <RouterLink class="btn" to="/video/film">Tout voir</RouterLink>
        <RouterLink v-if="film?.id != undefined" class="film" :to="'/video/film/' + film?.id">
            <img class="_thumbnail" :src="'http://localhost/film/image/' + film?.id" alt="">
            <p>{{ film?.title }}</p>
            <div class="description">
                {{ film?.description }}
            </div>
        </RouterLink>
        <a v-else class="viewMore">
            <p>Aucun film</p>
        </a>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    name: 'vid-video-new-film',
    components: {
        RouterLink,
    },
    props: {
        film: Object,
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    }
}

</script>

<style lang="scss" scoped>
@import '@/assets/video/film/list.css';

</style>