import Button from 'primevue/button'
import ConfirmationService from 'primevue/confirmationservice'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import PrimeVue from 'primevue/config'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(ConfirmationService)
  vueApp.use(DialogService)
  vueApp.use(PrimeVue, { ripple: true })
  vueApp.use(ToastService)

  vueApp.component('Button', Button)
  vueApp.component('DataView', DataView)
  vueApp.component('DataViewLayoutOptions', DataViewLayoutOptions)
  vueApp.component('Divider', Divider)
  vueApp.component('InputText', InputText)
  vueApp.component('Sidebar', Sidebar)
  vueApp.component('Skeleton', Skeleton)
  vueApp.component('Slider', Slider)
  vueApp.component('Toast', Toast)
})