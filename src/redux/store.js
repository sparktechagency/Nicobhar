import { configureStore } from '@reduxjs/toolkit'
import { authApi } from "./features/auth/authApi"
import { baseApi } from './api/baseApi'


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(baseApi.middleware)
})
