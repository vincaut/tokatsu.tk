    <!-- <div id="main">
    <div id="new">

    </div>
    <div id="all">
        <h1>Toutes les séries</h1>
        <div class="grid">
            <?php foreach($series as $serie): ?>
                <div>
                    <a class="serie" href="/video/serie/<?= $serie->getId() ?>">
                        <p><?= $serie->getTitre() ?></p>
                        <img class="_thumbnail" src="/serie/image/<?= $serie->getId() ?>" alt="Poster de la serie <?= $serie->getTitre() ?>">
                        <div class="description">
                            <?=$serie->getDescription()?>
                        </div>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div> -->

<template>
    <div id="main">
        <div id="new">

        </div>
        <div id="all">
            <h1>Toutes les séries</h1>
            <div class="grid">
                <div
                    v-for="serie in series"
                    :key="serie.id"
                >
                    <router-link class="serie" :to="'/video/serie/' + serie.id">
                        <p>{{ serie.title }}</p>
                        <img class="_thumbnail" :src="'http://localhost/serie/image/' + serie.id" :alt="'Poster de la serie ' + serie.id">
                        <div class="description">
                            {{ serie.description }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SerieDTO from '@/DTO/SerieDTO';

export default {
    name: 'vid-list-serie',
    components: {
    },
    props: {
        series: Array<SerieDTO>,
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
</style>
