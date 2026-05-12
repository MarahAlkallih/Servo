import { configureStore } from "@reduxjs/toolkit";
import tabbleReducer from "../features/DnamicTable/tableSlice"
export const store=configureStore({
    reducer:{
        table:tabbleReducer

    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;