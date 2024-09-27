<!-- <?php
$i = 0;
foreach($series as $serie)
{
    $i++;
    if ($i == 4) break;

    echo '<div>
        <a class="serie" href="/video/serie/'.$serie->getId().'">
            <p>'.$serie->getTitre().'</p>
            <img class="_thumbnail" src="/serie/image/'.$serie->getId().'" alt="Poster de la série '.$serie->getTitre().'">
            <div class="description">
            '.$serie->getDescription().'
            </div>
        </a>
    </div>';
}
if ($i == 0) echo '<h1>Aucune série</h1>';
if (count($series) <= 3)
echo '<a class="viewMore"><h1>Pas d\'autres séries pour le moment</h1></a>';
else
echo '<a class="viewMore serie" href="/video/serie/">
    <p>Tout voir...</p>
    <img class="_thumbnail" src="/serie/image/'.$serie->getId().'" alt="Poster de la série '.$serie->getTitre().'">
</a>';
?> -->

<template>
    <div class="shortList">
        <div class="grid">
            <div
                v-for="serie in listSeries"
                :key="serie.id"
            >
                <router-link class="serie" :to="'/video/serie/' + serie.id">
                    <p>{{ serie.title }}</p>
                    <img class="_thumbnail" :src="'http://localhost/serie/image/' + serie.id" alt="">
                    <div class="description">
                        {{ serie.description }}
                    </div>
                </router-link>
            </div>
            <div
                v-if="listSeries.length == 0"
            >
                <a class="viewMore">
                    <h1>Aucune série</h1>
                </a>
            </div>
            <div
                v-else-if="series.length <= 3"
            >
                <a class="viewMore">
                    <h1>Pas d'autres séries pour le moment</h1>
                </a>
            </div>
            <div
                v-else
            >
            <router-link class="viewMore film" to="/video/serie/">
                    <p>Tout voir...</p>
                    <img class="_thumbnail" :src="'http://localhost/serie/image/' + series[listSeries.length >= 3 ? 3 : listSeries.length - 1].id" :alt="'Poster de la série ' + series[listSeries.length >= 3 ? 3 : listSeries.length - 1].title">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SerieDTO from '@/DTO/SerieDTO';

export default {
    name: 'vid-video-serie',
    components: {
    },
    props: {
        series: {
            type: Array<SerieDTO>,
            default: null,
        }
    },
    data() {
        return {
            listSeries: [] as SerieDTO[],
        }
    },
    watch: {
        series() {
            this.refreshListSeries();
        }
    },
    mounted() {
        this.refreshListSeries();
    },
    methods: {
        refreshListSeries() {
            this.listSeries = [] as SerieDTO[];
            for (let i = 0; i < this.series.length; i++) {
                if (i < 3) {
                    this.listSeries.push(this.series[i]);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/video/serie/list.css';

</style>