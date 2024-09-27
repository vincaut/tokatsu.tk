<template>
    <div v-if="loaded">
        <vid-list-films
            :films="films"
        />

    </div>
</template>

<script lang="ts">
import vidListFilms from '@/components/video/film/vid-list-film.vue';

import FilmDTO from '@/DTO/FilmDTO';
import loaderMethods from '@/tools/loader-methods';

import axios from 'axios';

export default {
    name: 'v-video-film',
    components: {
        vidListFilms,
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
            films: [] as FilmDTO[],
            loaded: false,
        }
    },
    mounted() {
        loaderMethods.show();
        axios.get('http://localhost/video/film')
            .then((response) => {
                this.films = response.data;
                loaderMethods.hide();
                this.loaded = true;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
    }
}
</script>

<style lang="scss">
@import '@/assets/video/film/list.css';

</style>