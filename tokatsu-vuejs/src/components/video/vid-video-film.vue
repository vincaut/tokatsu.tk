<!-- <?php
$i = 0;
foreach($films as $film)
{
    $i++;
    if ($i == 4) break;

    echo '<div>
        <a class="film" href="/video/film/'.$film->getId().'">
            <p>'.$film->getTitre().'</p>
            <img class="_thumbnail" src="/film/image/'.$film->getId().'" alt="Poster de la série '.$film->getTitre().'">
            <div class="description">
            '.$film->getDescription().'
            </div>
        </a>
    </div>';
}
if ($i == 0) echo '<h1>Aucune série</h1>';
if (count($films) <= 3)
echo '<a class="viewMore"><h1>Pas d\'autres séries pour le moment</h1></a>';
else
echo '<a class="viewMore film" href="/video/film/">
    <p>Tout voir...</p>
    <img class="_thumbnail" src="/film/image/'.$film->getId().'" alt="Poster de la série '.$film->getTitre().'">
</a>';
?> -->

<template>
    <div class="shortList">
        <div class="grid">
            <div
                v-for="film in listFilms"
                :key="film.id"
            >
                <router-link class="film" :to="'/video/film/' + film.id">
                    <p>{{ film.title }}</p>
                    <img class="_thumbnail" :src="'http://localhost/film/image/' + film.id" alt="">
                    <div class="description">
                        {{ film.description }}
                    </div>
                </router-link>
            </div>
            <div
                v-if="listFilms.length == 0"
            >
                <a class="viewMore">
                    <h1>Aucun film</h1>
                </a>
            </div>
            <div
                v-else-if="films.length <= 3"
            >
                <a class="viewMore">
                    <h1>Pas d'autres films pour le moment</h1>
                </a>
            </div>
            <div
                v-else
            >
                <router-link class="viewMore film" to="/video/film/">
                    <p>Tout voir...</p>
                    <img class="_thumbnail" :src="'http://localhost/film/image/' + films[listFilms.length >= 3 ? 3 : listFilms.length - 1].id" :alt="'Poster de la série ' + films[listFilms.length >= 3 ? 3 : listFilms.length - 1].title">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import FilmDTO from '@/DTO/FilmDTO';

export default {
    name: 'vid-video-film',
    components: {
    },
    props: {
        films: {
            type: Array<FilmDTO>,
            default: null,
        }
    },
    data() {
        return {
            listFilms: [] as FilmDTO[],
        }
    },
    watch: {
        films() {
            this.refreshListFilms();
        }
    },
    mounted() {
        this.refreshListFilms();
    },
    methods: {
        refreshListFilms() {
            this.listFilms = [] as FilmDTO[];
            for (let i = 0; i < this.films.length; i++) {
                if (i < 3) {
                    this.listFilms.push(this.films[i]);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/video/film/list.css';

</style>