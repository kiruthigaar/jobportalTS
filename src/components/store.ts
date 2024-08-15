import {configureStore}  from '@reduxjs/toolkit'
import AppliedSlice from './slices/appliedSlice'
import FormValueSlice from './slices/formvalueSlice'


export const store = configureStore({
    devTools : true,
    reducer : {
        "applied":AppliedSlice,
        "formvalue":FormValueSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;