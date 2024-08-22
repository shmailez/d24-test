import { configureStore } from "@reduxjs/toolkit";
import CardReducer from './slices/CardList.ts'

const store = configureStore({
    reducer: {
        cardList: CardReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch