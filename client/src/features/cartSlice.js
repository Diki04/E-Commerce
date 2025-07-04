import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem:(state, action) => {
      const {product} = action.payload

      const item = state.cartItems.find((i) => i.cartId === product.cartId)
      if(item){
        item.amount += product.amount
      }else{
        state.cartItems.push(product)
      }
      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount
      

      localStorage.setItem('cart', JSON.stringify(state))

      toast.success(`${product.name} added to cart`)
    }
  }
})

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;