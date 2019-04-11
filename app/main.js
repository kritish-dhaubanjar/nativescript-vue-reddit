import Vue from 'nativescript-vue'
import App from './components/App'
import Vuex from 'vuex'
import store from './store/store'

Vue.use(Vuex)
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

new Vue({
  render: h=> h(App),
  // render: h => h('frame', [h(App)]),
  store,
  // render: h=> h(App)
}).$start()
