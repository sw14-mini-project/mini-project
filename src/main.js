import { createApp } from 'vue'
import App from './App.vue'

import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

app.config.globalProperties.DIALOG_CLICK_YES = 1;
app.config.globalProperties.DIALOG_CLICK_NO = 0;

app.config.globalProperties.DIALOG_TYPE_SUBTITLE = 100;
app.config.globalProperties.DIALOG_TYPE_TEXTFIELD = 110;
app.config.globalProperties.DIALOG_TYPE_COLORPICKER = 120;
app.config.globalProperties.DIALOG_TYPE_PROGRESS_LINEAR_INFINITY = 130;

app.use(router)
    .use(vuetify)

app.mount('#app')
