import i18n from '@/plugins/i18n';
import httpAxios from '@/tools/http-axios';
import loaderMethods from '@/tools/loader-methods';
import { notify } from '@kyvg/vue3-notification';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/v-home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/v-login.vue'),
      meta: {
        title: "Connexion",
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/v-register.vue'),
      meta: {
        title: "Inscription",
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/v-account.vue'),
      meta: {
        title: "Mon compte",
      }
    },

    // #region Vidéo

    {
      path: '/video',
      name: 'video',
      component: () => import('../views/video/v-video.vue'),
      meta: {
        title: "Vidéo",
        connected: true,
      }
    },

    // serie
    {
      path: '/video/serie',
      name: 'series',
      component: () => import('../views/video/serie/v-video-serie.vue'),
      meta: {
        title: "Séries",
        connected: true,
      }
    },
    {
      path: '/video/serie/:id',
      name: 'serie',
      component: () => import('../views/video/serie/v-video-serie-show.vue'),
      meta: {
        title: "Série",
        connected: true,
      },
      props: (route) => ({ id_serie: Number(route.params.id) })
    },

    // film
    {
      path: '/video/film',
      name: 'films',
      component: () => import('../views/video/film/v-video-film.vue'),
      meta: {
        title: "Films",
        connected: true,
      }
    },
    {
      path: '/video/film/:id',
      name: 'film',
      component: () => import('../views/video/film/v-video-film-show.vue'),
      meta: {
        title: "Film",
        connected: true,
      },
      props: (route) => ({ id_film: Number(route.params.id) })
    },

    {
      path: '/video/watch/:id',
      name: 'videoWatch',
      component: () => import('../views/video/v-video-watch.vue'),
      meta: {
        title: "Regarder une vidéo",
        connected: true,
        header: false,
        footer: false,
      },
      props: (route) => ({ id: Number(route.params.id) })
    },
    // #endregion

    // #region Admin
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/v-admin-home.vue'),
      meta: {
        title: "Admin",
        connected: true,
        admin: true,
        header: false,
      }
    },
    {
      path: '/admin/serie',
      name: 'gestionSeries',
      component: () => import('../views/admin/serie/v-admin-series.vue'),
      meta: {
        title: "Gestion des séries",
        connected: true,
        admin: true,
        header: false,
      }
    },
    {
      path: '/admin/serie/add',
      name: 'addSerie',
      component: () => import('../views/admin/serie/v-admin-serie-add.vue'),
      meta: {
        title: "Ajouter une série",
        connected: true,
        admin: true,
        header: false,
      }
    },
    {
      path: '/admin/serie/:id',
      name: 'gestionSerie',
      component: () => import('../views/admin/serie/v-admin-serie.vue'),
      meta: {
        title: "Gestion d'une série",
        connected: true,
        admin: true,
        header: false,
      },
      props: (route) => ({ id_serie: Number(route.params.id) })
    },
    {
      path: '/admin/film',
      name: 'gestionFilms',
      component: () => import('../views/admin/film/v-admin-films.vue'),
      meta: {
        title: "Gestion des films",
        connected: true,
        admin: true,
        header: false,
      }
    },
    {
      path: '/admin/film/:id',
      name: 'gestionFilm',
      component: () => import('../views/admin/film/v-admin-film.vue'),
      meta: {
        title: "Gestion d'un film",
        connected: true,
        admin: true,
        header: false,
      },
      props: (route) => ({ id_film: Number(route.params.id) })
    },
  ]
})

const DEFAULT_TITLE: string = 'Tokatsu';
router.beforeEach((to, from) => {
  document.title = to.meta.title ? to.meta.title as string : DEFAULT_TITLE;
  
  loaderMethods.show();

  if (document.cookie.indexOf('token') !== -1) {
    const token = {
      token: document.cookie.split('=')[1],
    }
    httpAxios.post('http://localhost/statusSession', token,
    (response: any) => {
      if (response.data.userVerif === false) {
        router.push('/account');
        notify({
          title: i18n.global.t('account.notVerifiedTitle'),
          text: i18n.global.t('account.notVerifiedMessage'),
          type: 'error',
        });
      }

      if (to.meta.admin) {
        if (response.data.permissions.includes('admin') === false) {
          router.push('/');
          notify({
            title: i18n.global.t('admin.notAdminTitle'),
            text: i18n.global.t('admin.notAdminMessage'),
            type: 'error',
          });
        }
      }
    },
    (error: any) => {
      if (error.response.status === 404) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        httpAxios.redirectLogin();
        notify({
          title: i18n.global.t('session.expiredTitle'),
          text: i18n.global.t('session.expiredMessage'),
          type: 'error',
        });
      }
    });
  }

  if (to.meta.connected) {
    if (document.cookie.indexOf('token') === -1) {
      setTimeout(() => {
        httpAxios.redirectLogin();
        notify({
          title: i18n.global.t('login.connectToAccess'),
          text: i18n.global.t('login.connectToAccessMessage'),
          type: 'error',
        });
      }, 10);
    }
  }

});

router.afterEach((to, from) => {

  if (to.meta.footer === false) {
    document.getElementById('footer')?.setAttribute('hidden', 'true');
  } else {
    document.getElementById('footer')?.removeAttribute('hidden');
  }

  if (to.meta.header === false) {
    document.getElementById('header')?.setAttribute('hidden', 'true');
  } else {
    document.getElementById('header')?.removeAttribute('hidden');
  }

  loaderMethods.hide();
});

export default router
