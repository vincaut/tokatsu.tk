<template>
    <div>
        <admAdminHeader></admAdminHeader>

        <div id="main-content">
            <div id="main-content-title">
            <h1>Gestion des séries</h1>
            </div>
            <router-link to="/admin/serie/add" class="btn">Ajouter une série</router-link>
            <div class="search">
                <div>
                    <h2>Rechercher : </h2>
                    <input type="text" v-model="searchValue">
                </div>
            </div>
            <EasyDataTable
                :headers="headers"
                :items="series"
                table-class-name="table-admin"
                :search-field="['title', 'description', 'genre']"
                :search-value="searchValue"
                header-text-direction="center"
                body-text-direction="center"
                :loading="!loaded"
            >
                <template #item-description="{ description }">
                    <div class="scrollable">{{ description }}</div>
                </template>

                <template #item-available="{ available }">
                    <div v-if="available == 'true'" style="background-color: green;">Oui</div>
                    <div v-else style="background-color: brown;">Non</div>
                </template>

                <template #item-image="{ id }">
                    <img :src="'http://localhost/serie/image/' + id " class="img-large"/>
                </template>

                <template #item-actions="{ id, available}">
                    <a 
                        @click="changeAvailable(id)"
                        :class="'btn ' + (available == 'true' ? 'btn-secondary' : 'btn-success')"
                    >
                        <div v-if="available == 'true'">Rendre indisponible</div>
                        <div v-else>Rendre disponible</div>
                    </a>
                    <router-link :to="'/admin/serie/' + id" class="btn btn-primary">Modifier</router-link>
                    <a @click="deleteSerie(id)" class="btn btn-danger">Supprimer</a>
                </template>

            </EasyDataTable>
            <c-modal-confirm
                v-model="showDeleteModal"
                title="Supprimer une série"
                @cancel="showDeleteModal = false"
                @confirm="confirmDeleteSerie"
            >
            </c-modal-confirm>
        </div>
    </div>
</template>

<script lang="ts">
import type { Header, Item } from "vue3-easy-data-table";
import admAdminHeader from "@/components/admin/adm-admin-header.vue";
import cModalConfirm from "@/components/commun/c-modal-confirm.vue";
import axios from "axios";
import type SerieDTO from "@/DTO/SerieDTO";

export default {
    name: "v-admin-series",
    components: {
        admAdminHeader,
        cModalConfirm,
    },
    props: {
        connectedUser: Object,
    },
    data() {
        return {
            headers: [] as Header[],
            series: [] as SerieDTO[],
            selectedIdSerie: 0,
            showDeleteModal: false,
            searchValue: "",
            loaded: false,
        };
    },
    mounted() {
        const headers: Header[] = [
            { text: "Titre", value: "title" },
            { text: "Description", value: "description" },
            { text: "Disponible", value: "available"},
            { text: "Genre", value: "genre" }, // Remplacez par les données réelles
            { text: "Nombre d'épisodes", value: "nbEpisodes" },
            { text: "Nombre de saisons", value: "nbSaisons" },
            { text: "Image", value: "image" },
            { text: "Actions", value: "actions" },
        ];
        this.headers = headers;
        this.getSeries();

    },
    methods: {
        getSeries() {
            this.loaded = false;
            axios.get("http://localhost/video/serie?withNotAvailable")
            .then((response) => {
                this.series = response.data;
                this.loaded = true;
            })
        },
        changeAvailable(id: number) {
            axios.get("http://localhost/admin/serie/available/" + id + "?token=" + this.connectedUser?.token)
            .then((response) => {
                const serie = this.series.find((serie) => serie.id == id);
                if (serie) {
                    serie.available = response.data.available;;
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        deleteSerie(id: number) {
            this.selectedIdSerie = id;
            this.showDeleteModal = true;
        },
        confirmDeleteSerie() {
            console.log(this.selectedIdSerie);
            this.showDeleteModal = false;
            // TODO: Supprimer la série
            // axios.get("http://localhost/serie/delete/" + this.selectedIdSerie)
            // .then((response) => {
            //     console.log(response.data);
            // })
            // .catch((error) => {
            //     console.log(error);
            // })
            // .finally(() => {
            //     this.showDeleteModal = false;
            // })
        }
    }
}
</script>

<style lang="scss" scoped>

.search {
    width: 100%;
    >div{
        display: flex;
        width: 300px;
        flex-direction: column;
        align-items: center;
        margin: auto;
    }
    input {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
}

.table-admin {
    --easy-table-border: 0px;

    --easy-table-header-background-color: rgb(43, 43, 43);
    --easy-table-header-font-color: white;
    --easy-table-header-font-size: medium;

    --easy-table-body-even-row-font-color: #ffffff;
    --easy-table-body-even-row-background-color: white;

    --easy-table-body-row-font-color: white;
    --easy-table-body-row-background-color: rgb(43, 43, 43);
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: rgb(70, 70, 70);

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: rgb(68, 58, 49);
    --easy-table-footer-font-color: #f3f3f3;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-loading-mask-background-color: rgb(43, 43, 43);
}

</style>