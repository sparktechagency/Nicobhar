import { baseApi } from "../../api/baseApi";



export const adminProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateAdminProfile: builder.mutation({
            query: (updateInfo) => ({
                url: '/auth/profile-update',
                method: 'POST',
                body: updateInfo,
            }),
            invalidatesTags: ["adminProfile"],
        }),
        updatePasswordAdminProfile: builder.mutation({
            query: (updatePasswordInfo) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: updatePasswordInfo,
            }),
            invalidatesTags: ["adminProfile"],
        }),
        getAdminProfile: builder.query({
            query: () => ({
                url: '/auth/profile',
                method: 'GET',
            }),
            invalidatesTags: ["adminProfile"],
        }),
    }),
});

export const { useUpdateAdminProfileMutation, useUpdatePasswordAdminProfileMutation,useGetAdminProfileQuery } = adminProfileApi;
