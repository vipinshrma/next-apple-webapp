import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface BasketState {
    items: Product[]
}

// Define the initial state using that type
const initialState: BasketState = {
    items: []
}

export const baseketSlice = createSlice({
    name: 'basket',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state: BasketState, action: PayloadAction<{ id: string }>) => {
            const removeIndex = state.items.findIndex((item: Product) => item._id === action.payload.id)
            console.log(removeIndex)
            let newBasket = [...state.items]
            if (removeIndex >= 0) {
                newBasket.splice(removeIndex, 1)
            } else {
                console.log("can't deleted")
            }
            state.items = newBasket;
        }

    },
})

export const { addToBasket, removeFromBasket } = baseketSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBasketItems = (state: RootState) => state.basket.items
export const selectBasketItemWithId = (state: RootState, id: string) => {
    state.basket.items.filter((item: Product) => item._id === id)
}
export const selectBasketTotal = (state: RootState) => {
   return state.basket.items.reduce((total: number, item: Product) => total += item.price, 0)
}

export default baseketSlice.reducer