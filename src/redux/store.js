import { configureStore } from '@reduxjs/toolkit'
import { authApi } from "./features/auth/authApi"
import { baseApi } from './api/baseApi'
import authReducer from './features/auth/authSlice'  // import your authSlice reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,   // add your auth slice here!
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddlewares =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});
