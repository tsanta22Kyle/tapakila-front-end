import { CartStore, Ticket } from '@/lib/types'
import {create} from 'zustand'

export const useStore = create<CartStore>((set)=>({
    cartItems : [],
    addItem : (item: Ticket)=> set((state: { cartItems: Ticket[] })=>({
        cartItems : [...state.cartItems,item] 
    })),
    removeItem : (id: string)=> set((state: { cartItems: Ticket[] })=>({
        cartItems : state.cartItems.filter((ticket)=> ticket.id !=id)
    })),
    QuantityIncrement : (id)=> set((state: { cartItems: any })=> ({
        cartItems : state.cartItems.map((item)=>item.id == id  && item.quantity <= item.availableQuantity ?{...item,quantity: item.quantity+1}:item)
    }) ),
    QuantityDiscrement : (id)=> set((state: { cartItems: any })=> ({
        cartItems : state.cartItems.map((item)=>item.id == id && item.quantity>1?{...item,quantity: item.quantity-1}:item)
    }) ),
    updateItemQuantity : (id,quantity) => set((state)=>({
        cartItems : state.cartItems.map((item)=> item.id == id?{...item,quantity : item.quantity+quantity}:item)
    })),
    clearCart : ()=> set((state)=>({
        cartItems : []
    }))
}))