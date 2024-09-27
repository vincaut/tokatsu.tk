<template>
    <div v-if="loaded">
        <div id="main">
            <div id="newOut" class="grid">
            <vid-video-new-film
                :film="newFilm"
            />

            <vid-video-new-serie
                :serie="newSerie"
            />
            </div>
            <hr>

            <!-- <h1>Continuer la lecture :</h1>

            <div></div> -->

            <h1>Séries :</h1>
                <vid-video-serie
                    :series="series"
                />


            <h1>Films :</h1>
                <vid-video-film
                    :films="films"
                />
        </div>
    </div>
</template>

<script lang="ts">
import FilmDTO from '@/DTO/FilmDTO';
import SerieDTO from '@/DTO/SerieDTO';

import vidVideoNewFilm from '@/components/video/vid-video-new-film.vue';
import vidVideoNewSerie from '@/components/video/vid-video-new-serie.vue';
import vidVideoSerie from '@/components/video/vid-video-serie.vue';
import vidVideoFilm from '@/components/video/vid-video-film.vue';

import axios from 'axios';
import loaderMethods from '@/tools/loader-methods';

export default {
  name: 'v-video',
  components: {
    vidVideoNewFilm,
    vidVideoNewSerie,
    vidVideoSerie,
    vidVideoFilm,
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
      newFilm: {} as FilmDTO,
      newSerie: {} as SerieDTO,

      series: [] as SerieDTO[],
      films: [] as FilmDTO[],

      loaded: false,
    }
  },
  mounted() {
    loaderMethods.show();
    Promise.all([
      axios.get('http://localhost/video/newFilm'),
      axios.get('http://localhost/video/newSerie'),

      axios.get('http://localhost/video/serie'),
      axios.get('http://localhost/video/film'),
    ])
    .then((responses) => {
      this.newFilm = responses[0].data as FilmDTO;
      this.newSerie = responses[1].data as SerieDTO;

      this.series = responses[2].data as SerieDTO[];
      this.films = responses[3].data as FilmDTO[];
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
        loaderMethods.hide();
        this.loaded = true;
    });
  },

  methods: {
  },
}

</script>

<style lang="scss" scoped>

</style>