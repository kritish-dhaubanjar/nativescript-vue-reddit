import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import localStorage from 'nativescript-localstorage'

Vue.use(Vuex)

const NSVuexPersistent = store => {
 // Init hook.
 let storageStr = localStorage.getItem('ns-vuex-persistent');
 if (storageStr) {
  store.replaceState(JSON.parse(storageStr))
 }
 store.subscribe((mutation, state) => {
  // Suscribe hook.
  localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
 })
};

const store = new Vuex.Store({
    state: {
      reddits : [],
    },
    getters:{
    	getReddits: state=>{
    		return state.reddits
    	},
    	getSync: state=>{
    		return state.isSync
    	}
    },
    mutations: {
	    addReddit (state, reddit) {
	      state.reddits.indexOf(reddit) == -1 ? state.reddits.push(reddit) : console.log("Reddit already exists")
	    },
	    delReddit (state, reddit) {
	      	(state.reddits).splice((state.reddits).indexOf(reddit), 1);
	      	console.log(state.reddits)
	    }
  	},
  	plugins: [NSVuexPersistent]
})

export default store
