<template>
    <VueFinalModal
        class="custom-modal"
        content-class="custom-modal-content"
        content-transition="vfm-fade"
        overlay-transition="vfm-fade"
    >
    <h3 class="modal-title">{{ title }}</h3>
    <slot />
    <div class="modal-button">
        <button class="btn btn-primary" @click="$emit('confirm')">Valider</button>
        <button class="btn btn-danger" @click="$emit('cancel')">Annuler</button>
    </div>
    </VueFinalModal>
</template>

<script lang="ts">
import { nextTick } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

export default {
    name: 'c-modal-confirm',
    components: {
        VueFinalModal
    },
    props: {
        title: String
    },
    data() {
        return {
            loaded: false,
        };
    },
    mounted() {
        nextTick(() => {
            this.loaded = true;
        });
    },
}
</script>

<style lang="scss">
.custom-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}

.custom-modal-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 24rem;
    margin: 1em;
    padding: 1.5rem;
    background-color: rgb(43,43,43);
    border: 1px solid rgb(117, 117, 117);
    border-radius: 0.5rem;
    gap: 1rem;
}

.modal-title {
    font-size: 1.5rem;
    margin: 0;
}

.modal-button {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

</style>
