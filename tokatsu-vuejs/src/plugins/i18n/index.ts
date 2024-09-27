import { createI18n } from 'vue-i18n';
import type { LocaleMessages } from 'vue-i18n';
import _ from 'lodash';
import moment from 'moment';

async function loadLocaleMessages() {
    const messages: LocaleMessages = {};

    // Translations
    const localesCommon = import.meta.glob('@/plugins/i18n/locales/*/*.json');

    for (const path in localesCommon) {
        const value = await localesCommon[path]();

        const matched = path.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = _.merge(messages[locale], value);
        }
    }

    return messages;
}

const i18n = createI18n({
    messages: await loadLocaleMessages(),
    locale: localStorage.getItem('i18nextLng')?.toString().split('-')[0] ?? 'fr',
    fallbackLocale: 'fr',
    silentTranslationWarn: import.meta.env.VUE_APP_MODE !== 'development'
});

moment.locale('fr');

// window.addEventListener('changeLanguage', () => {
//     i18n.locale = localStorage.getItem('i18nextLng')?.toString().split('-')[0] ?? 'fr';
//     moment.locale(i18n.locale);
// });

export default i18n;
