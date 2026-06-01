import { configureStore } from "@reduxjs/toolkit";
import tabbleReducer from "../features/DnamicTable/tableSlice"
import branchReducer from "../features/filter/branches/customBranch"
import authReducer from "../features/auth/setAuth"
export const store=configureStore({
    reducer:{
        table:tabbleReducer,
        branch:branchReducer,
        auth:authReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;