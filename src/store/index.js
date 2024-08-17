import { createStore } from 'vuex'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import { applyToken } from '@/service/AuthenticateUser.js'
// import { useCookies } from 'vue3-cookies'

// const {cookies} = useCookies()

const apiURL = "http://localhost:3001/"
export default createStore({
  state: {
    users: null,
    user: null,
    products:null,
    recentProducts: null,
    product:null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value){
      state.users = value
    },
    setUser(state, value){
      state.user = value
    },
    setRecentProducts(state, value){
      state.recentProducts = value
    },
    setProducts(state, value){
      state.products = value
    },
    setProduct(state, value){
      state.product = value
    }
  },
  actions: {
    async recentProducts(context){
      try{
        console.log('here');
        const{results, message} = await(await axios.get(`${apiURL}products/recent`)).data

        console.log(results);
        if(results){
          context.commit('setRecentProducts', results)
        }else{
          toast.error(`${message}`,{
            autoClose: 3000
          })
        }
      }catch(e){
        toast.error(`${e.message}`,{
          autoClose: 3000
        })
      }
    }
  },
  modules: {
  }
})
