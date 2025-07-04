import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  carItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue
}

const carSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem:(state, action) => {
      const {product} = action.payload

      const item = state.carItems.find((i) => i.cartId === product.cartId)
      if(item){
        item.amount += product.amount
      }else{
        state.carItems.push(product)
      }
      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount
      

      localStorage.setItem('cart', JSON.stringify(state))

      toast.success(`${product.name} added to cart`)
    }
  }
})

export const { addItem } = carSlice.actions;
export default carSlice.reducer;