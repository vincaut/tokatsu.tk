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
            <div v-if="!serie.available" class="nodispo">
                <h1>Non disponible</h1>
            </div>
            <div class="grid">
                <div>
                    <h1>{{ serie.title }}</h1>
                    <p class="description">{{ serie.description }}</p>
                    <!-- <?php
                        if($isConnect != null && $isConnect['personne']->getRole_id() == 1000){
                            echo '
                                <a class="btn" href="/admin/serie/'.$serie->getId().'">Modifier</a>
                            ';
                        }
                    ?> -->
                    <a v-if="connectedUser?.permissions.includes('admin')" class="btn" :href="'/admin/serie/' + serie.id">Modifier</a>
                </div>
                <div>
                    <img class="img-xlarge" :src="'http://localhost/serie/image/' + serie.id" alt="">
                </div>
            </div>
        </div>
        <div
            v-for="saison in serie.nbSaison"
            :key="saison"
        >
            <h2 class="saison">Saison {{ saison }}</h2>
            <div class="grid">
                <a
                    v-for="episode in getEpisodes(saison)"
                    :key="episode.id"
                    class="episode"
                    :href="'/video/watch/' + serie.id"
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
    </div>
</template>

<script lang="ts">
import type SerieDTO from '@/DTO/SerieDTO';
import axios from 'axios';

export default {
    name: 'v-video-serie-show',
    props: {
        connectedUser: Object,
        id_serie: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            serie : {} as SerieDTO,
            loaded: false,
        }
    },
    mounted() {
        axios.get('http://localhost/video/serie/' + this.id_serie)
            .then((response) => {
                const available = response.data.available == 'true' ? true : false;
                this.serie = response.data as SerieDTO;
                this.serie.available = available;
                this.loaded = true;

                console.log(this.serie);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        getEpisodes(saison: number) {
            const episodes = this.serie.episodes.filter((episode) => {
                return episode.numSaison == saison;
            });

            return episodes;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/video/serie/show.css';
</style>