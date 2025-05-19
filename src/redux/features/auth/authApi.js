import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ["auth"], 
    }),

    forgetPassword: builder.mutation({
      query: (userEmail) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userEmail,
      }),
      invalidatesTags: ["auth"], 
    }),
  }),
});

export const { useLoginMutation, useForgetPasswordMutation } = authApi;
