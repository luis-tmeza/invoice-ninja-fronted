import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, value) {
      const indice = state.cart.findIndex(x => x.id === value.id)
      console.log(indice)
      console.log(value)
      if (indice >= 0) {
        state.cart[indice].quantity += 1
        state.cart[indice].iva += state.cart[indice].ivaProduct
        state.cart[indice].subtotal += state.cart[indice].finalPrice
      } else {
        state.cart.push(value)
      }
    },

    UPDATE_ITEMS(state, value) {
      const index = state.cart.findIndex(x => x.id === value.id)
      let discount
      if (parseFloat(value.quantity)) {
        if (parseFloat(value.discount)) {
          discount = parseFloat(value.discount) / 100
        } else {
          discount = 0
        }
        const quantity = parseInt(value.quantity)
        const price = parseFloat(value.price)
        const totalDiscount = parseFloat(quantity * price * discount)
        const subtotalProduct = (price * quantity) - totalDiscount
        const iva = (subtotalProduct * 0.19)
        const totalLinea = (subtotalProduct + iva)
        state.cart[index].quantity = quantity
        state.cart[index].iva = iva
        state.cart[index].subtotal = totalLinea
        // state.cart[index].discountAmount = totalDiscount
      } else {
        state.cart[index].iva = 0
        state.cart[index].subtotal = 0
      }
    }


  },
  actions: {

  },


})
