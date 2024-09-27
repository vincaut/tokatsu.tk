<template>
    <div v-if="loaded">
        <vid-list-serie
            :series="series"
        />

    </div>
</template>

<script lang="ts">
import loaderMethods from '@/tools/loader-methods';

import vidListSerie from '@/components/video/serie/vid-list-serie.vue';

import SerieDTO from '@/DTO/SerieDTO';

import axios from 'axios';

export default {
    name: 'v-video-serie',
    components: {
        vidListSerie,
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
            series: [] as SerieDTO[],
            loaded: false,
        }
    },
    mounted() {
        loaderMethods.show();
        axios.get('http://localhost/video/serie')
            .then((response) => {
                this.series = response.data;
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
@import '@/assets/video/serie/list.css';

</style>