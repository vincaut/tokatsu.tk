<template>
    <main>
        <div id="main">
            <Carousel :wrap-around="true" :items-to-show="2.5">
                <Slide v-for="slide in 10" :key="slide">
                    <div class="carousel__item">{{ slide }}</div>
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
            <!-- <div class="box-content">
                <h2>
                    Avez-vous déjà rêvé de pouvoir accéder à tous vos programmes préférés en un seul endroit, sans avoir à naviguer entre plusieurs plateformes de streaming? Si oui, alors vous allez adorer Tokatsu.
                </h2>
                <h3>
                    Tokatsu est un site de streaming en cours de développement qui promet de révolutionner l'expérience de visionnage de vidéos en ligne. <span>Bien qu'il soit actuellement en phase bêta et n'est accessible qu'à un nombre limité de personnes</span>, le créateur de Tokatsu est convaincu que ce projet a un avenir prometteur.
                </h3>
                <h3>
                    Imaginez un monde où vous pouvez facilement accéder à des milliers de contenus de qualité, des films aux séries, en passant par des émissions de télévision et des documentaires, le tout en un seul endroit. C'est exactement ce que Tokatsu vise à offrir à ses utilisateurs.
                </h3>
                <h3>
                    Le site est conçu pour être facile à utiliser, avec une interface intuitive et une navigation simple. Il sera également équipé d'un algorithme de recommandation intelligent qui apprendra vos préférences de visionnage et vous fournira des recommandations personnalisées en fonction de vos choix antérieurs.
                </h3>
                <h3>
                    Alors que Tokatsu est encore en phase de développement, le créateur travaille dur pour offrir une expérience de streaming exceptionnelle à leurs utilisateurs. Si vous cherchez un moyen pratique de regarder vos émissions préférées, Tokatsu est l'endroit idéal pour vous. Restez à l'écoute pour plus d'informations sur le lancement de ce nouveau site de streaming très prometteur.
                </h3>      
            </div> -->

            <!-- <div class="box-content">
                <h2>
                    Tokatsu a subi des dommages :(.
                </h2>
                <h3>
                    Nous sommes désolés pour la gêne occasionnée. Veuillez revenir sur notre site bientôt pour découvrir de nouvelles fonctionnalités qui amélioreront votre expérience.
                </h3>
            </div> -->
        </div>

    </main>
</template>

<script lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: 'v-home',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    props: {
        connectedUser: Object,

        loadedAccount: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>
.box-content {
    position: absolute;
    left : 50%;
    transform:translate(-50%);
    width: 80%;
    padding: 20px;
    background-color: #0d5800;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.box-content h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
}
.box-content h3 {
    font-size: 1.2em;
    font-weight: 400;
    margin-bottom: 10px;
}
.box-content h3 z {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>