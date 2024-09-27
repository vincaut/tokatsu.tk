    <!-- <div id="main">
    <div id="new">

    </div>
    <div id="all">
        <h1>Toutes les films</h1>
        <div class="grid">
            <?php foreach($films as $film): ?>
                <div>
                    <a class="film" href="/video/film/<?= $film->getId() ?>">
                        <p><?= $film->getTitre() ?></p>
                        <img class="_thumbnail" src="/film/image/<?= $film->getId() ?>" alt="Poster de la film <?= $film->getTitre() ?>">
                        <div class="description">
                            <?=$film->getDescription()?>
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
            <h1>Toutes les films</h1>
            <div class="grid">
                <div
                    v-for="film in films"
                    :key="film.id"
                >
                    <router-link class="film" :to="'/video/film/' + film.id">
                        <p>{{ film.title }}</p>
                        <img class="_thumbnail" :src="'http://localhost/film/image/' + film.id" :alt="'Poster de la film ' + film.id">
                        <div class="description">
                            {{ film.description }}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import FilmDTO from '@/DTO/FilmDTO';

export default {
    name: 'vid-list-film',
    components: {
    },
    props: {
        films: Array<FilmDTO>,
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
