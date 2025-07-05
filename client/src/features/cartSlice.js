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
    },
    editItem: (state, action) => {
      const { cartId, amount} = action.payload;
      const itemProduct = state.cartItems.find((item) => item.cartId === cartId);

      state.numItemsInCart += amount - itemProduct.amount;
      state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
      itemProduct.amount = amount;
      localStorage.setItem('cart', JSON.stringify(state));
      toast.info(`${itemProduct.name} amount updated`);
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const itemProduct = state.cartItems.find((item) => item.cartId === cartId);

      state.numItemsInCart -= itemProduct.amount;
      state.cartTotal -= itemProduct.price * itemProduct.amount;
      state.cartItems = state.cartItems.filter((item) => item.cartId !== cartId);
      localStorage.setItem('cart', JSON.stringify(state));
      toast.error(`${itemProduct.name} removed from cart`);
    }
  }
})

export const { addItem, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;