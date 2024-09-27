<!-- <?php
for ($i=1; $i <= $nbSaison; $i++) {
    echo '<h2 class="saison">Saison '.$i.'</h2>
    <div class="grid">';
    foreach($videos as $video){
        if($video->getSaison() == $i){
            echo '<a class="episode" href="/video/watch/'.$video->getId().'">
                <img class="_thumbnail" src="/video/image/'.$video->getId().'" alt="">
                <p class="">'.$video->getTitre().'</p>
                <img class="play" src="/assets/CSS/images/play-button.png" alt="" >
                <div class="description">
                '.$video->getDescription().'
                </div>';
                if($isConnect != null) {
                    echo '<div class="progressView" style="width:'.(HistoriqueManager::getByUserIdAndVideoId($this->IsConnected()['personne']->getId(), $video->getId()) ? HistoriqueManager::getByUserIdAndVideoId($this->IsConnected()['personne']->getId(), $video->getId())->getTimewatch() : 0).'%"></div>';
                }
            echo '</a>';
        }
    }
    echo '</div>';
}
?> -->


<template>
    <div v-if="loaded">
        <div id="intro">
            <div v-if="!film.available" class="nodispo">
                <h1>Non disponible</h1>
            </div>
            <div class="grid">
                <div>
                    <h1>{{ film.title }}</h1>
                    <p class="description">{{ film.description }}</p>
                    <!-- <?php
                        if($isConnect != null && $isConnect['personne']->getRole_id() == 1000){
                            echo '
                                <a class="btn" href="/admin/film/'.$film->getId().'">Modifier</a>
                            ';
                        }
                    ?> -->
                </div>
                <div>
                    <img class="img-xlarge" :src="'http://localhost/film/image/' + film.id" alt="">
                </div>
            </div>
        </div>
        <div class="grid">
            <a
                v-for="episode in film.films"
                :key="episode.id"
                class="episode"
                :href="'/video/watch/' + episode.id"
            >
                <img class="_thumbnail" :src="'http://localhost/video/image/' + episode.id" alt="">
                <p class="">{{ episode.title }}</p>
                <img class="play" src="@/assets/img/play-button.png" alt="" >
                <div class="description">
                    {{ episode.description }}
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import type FilmDTO from '@/DTO/FilmDTO';
import axios from 'axios';

export default {
    name: 'v-video-film-show',
    props: {
        id_film: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            film : {} as FilmDTO,
            loaded: false,
        }
    },
    mounted() {
        axios.get('http://localhost/video/film/' + this.id_film)
            .then((response) => {
                this.film = response.data as FilmDTO;
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

<style lang="scss" scoped>
@import '@/assets/video/film/show.css';
</style>