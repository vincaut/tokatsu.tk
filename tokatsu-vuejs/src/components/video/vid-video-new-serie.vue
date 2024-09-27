<!-- eslint-disable no-irregular-whitespace -->
<template>
    <div>
        <h1>Nouveau série :</h1>
        <RouterLink class="btn" to="/video/serie">Tout voir</RouterLink>
        <RouterLink v-if="serie?.id != undefined" class="serie" :to="'/video/serie/' + serie?.id">
            <img class="_thumbnail" :src="'http://localhost/serie/image/' + serie?.id" alt="">
            <p>{{ serie?.title }}</p>
            <div class="description">
                {{ serie?.description }}
            </div>
        </RouterLink>
        <a v-else class="viewMore">
            <p>Aucune série</p>
        </a>
    </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    name: 'vid-video-new-serie',
    components: {
        RouterLink,
    },
    props: {
        serie: Object,
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
@import '@/assets/video/serie/list.css';

</style>