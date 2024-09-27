<template>    
    <div>
        <div id="pop" hidden>Chargement ...</div>
        <router-link v-if="loadedEp" :to="'/video/serie/' + infoEp.content.id" id="btnback" class="player"><i class="fa-solid fa-arrow-left" style="color: #ffffff; cursor: pointer;"></i></router-link>
        <div id="titre" class="player" >
            {{ infoEp.title }}
        </div>

        <video v-if="loadedAccount" id="video" :src='`http://localhost/video/video/${id}?token=${connectedUser?.token}`' autoplay controls oncontextmenu="return false;"></video>

        <div class="player">
                <!-- <?php
            if ($nextEp != null)
                echo '<div id="nextEp" class="player" >Episode suivant, Ep.'. $nextEp->getEpisode().' - S.'. $nextEp->getSaison() .' ⇝</div>';
            else
                echo '<div id="nextEp" class="player"></div>';
            ?> -->
            <div v-if="loadedNextEp != null" @click="clickNextEp()" id="nextEp" class="player" >Episode suivant, S.{{ nextEp.saison }} - Ep.{{ nextEp.episode }} ⇝</div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import loaderMethods from '@/tools/loader-methods';
import InfoEpDTO from '@/DTO/InfoEpDTO';

export default {
    name: 'v-video-watch',
    props: {
        id: Number,
        connectedUser: Object,
        loadedAccount: {
            type: Boolean,
            default: false,
        },
        recaptcha: String,
    },
    data() {
        return {
            loadedEp: false,
            loadedNextEp: false,

            btnTimeLeft: 0,
            popTimeLeft: 0,
            mainInterval: null as unknown,
            infoEp: {} as InfoEpDTO,
            nextEp: {} as InfoEpDTO,
        }
    },
    watch: {
        loadedAccount() {
            console.log('loadedAccount', this.loadedAccount);
            console.log('connectedUser', this.connectedUser?.token);

            this.$nextTick(() => {
                axios.get('http://localhost/video/info/' + this.id + '?token=' + this.connectedUser?.token)
                .then((response) => {
                    this.infoEp = response.data as InfoEpDTO;
                    document.title = this.infoEp.title + ' - S.' + this.infoEp.saison + ' Ep.' + this.infoEp.episode;

                    this.loadedEp = true;
                })
                .catch((error) => {
                    console.log(error);
                });

                axios.get('http://localhost/video/next/' + this.id + '?token=' + this.connectedUser?.token)
                .then((response) => {
                    this.nextEp = response.data as InfoEpDTO;

                    this.loadedNextEp = true;
                })
                .catch((error) => {
                    this.nextEp = null as unknown as InfoEpDTO;
                });

                const video = document.getElementById('video') as HTMLVideoElement;

                video.addEventListener('play', () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener('pause', () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener('mousemove', () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener('click', () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener("touchstart", () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener("touchend", () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener("touchcancvideo", () => {
                    this.refreshTimeleft();
                }, true);
                video.addEventListener("touchmove", () => {
                    this.refreshTimeleft();
                }, true);

                loaderMethods.hide();
            });
        },
    },
    mounted() {
        if (document.getElementById('video') == null)
        {
            loaderMethods.show();
        }
        const playerBtn = document.getElementsByClassName('player');
        this.mainInterval = setInterval(() => {
            if (document.getElementById('video') != null)
            {
                if(this.popTimeLeft <= 0)
                {
                    document.getElementById('pop')!.style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('pop')!.hidden = true;
                    }, 200);
                }
                else
                {
                    this.popTimeLeft = Math.round(this.popTimeLeft*10)/10 - 0.1;

                    document.getElementById('pop')!.hidden = false;
                    setTimeout(() => {
                        document.getElementById('pop')!.style.opacity = '1';
                    }, 200);
                }
            }

            if(this.btnTimeLeft <= 0){

                for (let index = 0; index < playerBtn.length; index++) {
                    (playerBtn[index] as HTMLElement).style.opacity = '0';
                }
                setTimeout(() => {
                    for (let index = 0; index < playerBtn.length; index++) {
                        (playerBtn[index] as HTMLElement).hidden = true;
                    }
                }, 200);
            }
            else
            {
                this.btnTimeLeft = Math.round(this.btnTimeLeft*10)/10 - 0.1;
                
                for (let index = 0; index < playerBtn.length; index++) {
                    (playerBtn[index] as HTMLElement).hidden = false;
                }
            
                setTimeout(() => {
                    for (let index = 0; index < playerBtn.length; index++) {
                        (playerBtn[index] as HTMLElement).style.opacity = '1';
                    }
                }, 200);    
            }
        }, 100);
    },
    methods: {
        //#region pop
        pop(value: string) {
            if (document.getElementById('video') != null){
                document.getElementById('pop')!.innerHTML = value;
                this.popTimeLeft = 3;
            }
        },

        popPersiste(value: string) {
            this.popTimeLeft = 9999999999999;
            document.getElementById('pop')!.innerHTML = value;
        },   

        refreshTimeleft() {
            const video = document.getElementById('video') as HTMLVideoElement;
            const percent = (video.currentTime / video.duration) * 100;
            this.btnTimeLeft = 2;
            if (percent > 99 || video.paused)
                this.btnTimeLeft = 9999999999999;
            else
                this.btnTimeLeft = 2;
        },

        clickNextEp() {
            const video = document.getElementById('video') as HTMLVideoElement;
            video.pause();
            this.$router.push('/video/watch/' + this.nextEp.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/video/watch.scss';

*:not(a, i) {
    background-color: black;
}

</style>