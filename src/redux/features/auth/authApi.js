import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["auth"],
    }),

    forgetPassword: builder.mutation({
      query: (userEmail) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: userEmail,
      }),
      invalidatesTags: ["auth"],
    }),

    otpVerify: builder.mutation({
      query: (otp) => ({
        url: "/auth/verify",
        method: "POST",
        body: otp,
      }),
      invalidatesTags: ["auth"],
    }),

    createNewPassword: builder.mutation({
      query: (newPasswordInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: newPasswordInfo,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useCreateNewPasswordMutation,
} = authApi;
