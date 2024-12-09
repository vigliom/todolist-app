// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'

// Vuetify
import { createVuetify } from "vuetify";

const messages = {
  en: {
      'AppName': 'ToDo it!',
      'Selecciona un dia': 'Selecct a day',
  },
  es: {
      'AppName': 'ToDo it!',
      'Selecciona un dia': 'Selecciona un dia',
  },
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'es',
  fallbackLocale: 'es',
  messages: messages,
})

export default createVuetify({
  icons: {
    iconfont: "mdi",
    sets: {
      mdi,
    },
  },
  locale:{
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  }
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
