<!-- <div class="container">
    <div class="row">
        <form action="<?php if ($modif) echo '/admin/serie/edit/'.$tabForm['id']; else echo '/admin/serie/add'; ?>" method="post" enctype="multipart/form-data">
            <div class="group-form">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre" value="<?php if(isset($tabForm['titre'])) echo $tabForm['titre'] ?>">
            </div>
            <div class="group-form">
                <label for="titre">Description</label>
                <textarea name="description" id="description" cols="30" rows="10"><?php if(isset($tabForm['description'])) echo $tabForm['description'] ?></textarea>
            </div>
            <div class="group-form">
                <label for="titre">Image</label>
                <input type="file" name="image" id="image" value="" accept="image/*" enctype='multipart/form-data'>
                <?php if (isset($tabForm['image'])) : ?>
                    <img src="<?= $tabForm['image'] ?>" alt="Image de la vidéo" class="img-medium">
                <?php endif; ?>
            </div>
            <div class="group-form">
                <label for="disponible">
                    <input type="checkbox" name="disponible" id="disponible" value="1" <?php if(isset($tabForm['disponible']) && $tabForm['disponible'] == 1) echo 'checked' ?>>
                    Disponible
                </label>
            </div>
            <input type="hidden" name="id" id="id" value="<?php if(isset($tabForm['id'])) echo $tabForm['id'] ?>">
            <input type="submit" class="btn btn-primary" value="<?php if ($modif) echo 'Modifier'; else echo 'Enregistrer'; ?>"/>
            <p id="status"></p>
        </form>
    </div>
</div>   -->

<template>
    <div>
        <admAdminHeader></admAdminHeader>

        <div class="form">
            <form @submit.prevent="saveSerie">
                <div class="group-form">
                    <label for="titre">Titre</label>
                    <input type="text" name="titre" id="titre" v-model="title">
                </div>
                <div class="group-form">
                    <label for="titre">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
                </div>
                <div class="group-form">
                    <label for="titre">Image</label>
                    <input type="file" name="image" id="image" value="" accept="image/*" enctype='multipart/form-data'>
                </div>
                <div class="group-form">
                    <label for="disponible">
                        <input type="checkbox" name="disponible" id="disponible" v-model="available">
                        Disponible
                    </label>
                </div>
                <input type="hidden" name="id" id="id" value="">
                <input type="submit" class="btn btn-primary" value="Enregistrer"/>
                <p id="status"></p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import admAdminHeader from "@/components/admin/adm-admin-header.vue";
import httpAxios from "@/tools/http-axios";

export default {
    name: "v-admin-serie-add",
    components: {
        admAdminHeader,
    },
    props: {
        connectedUser: Object,
    },
    data() {
        return {
            title: "",
            description: "",
            available: false,
        };
    },
    mounted() {
        
    },
    methods: {
        saveSerie() {
            const image = document.getElementById("image")?.files[0];

            const datas = {
                title: this.title,
                description: this.description,
                available: this.available,
                image: image,
            };

            httpAxios.post("http://localhost/admin/serie/add", datas,
                (response: any) => {
                    console.log(response);
                },
                (error: any) => {
                    console.log(error.message);
                }
            )

        },
    },
};
</script>

<style lang="scss" scoped>
</style>