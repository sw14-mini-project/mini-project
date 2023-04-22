import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const myCustomLightTheme = {
    dark: true,
    colors: {
        accent_pink: '#E93B84',
        default_color: '#1A1C1E',
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    },
    icons: {
        defaultSet: 'mdi',
    },
})

export default vuetify;