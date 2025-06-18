import { baseApi } from "../../api/baseApi";



export const dashboardMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postMess: builder.mutation({
      query: (sendAbleData) => ({
        url: `/send-message`,
        method: "POST",
        body:sendAbleData
      }),
      invalidatesTags: ["message"],
    }),
    getSearchNewUser: builder.query({
      query: (role) => ({
        url: `/search-new-user?role=${role}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getMess: builder.query({
      query: (id) => ({
        url: `/get-message?receiver_id=${id}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getOrganization: builder.query({
      query: () => ({
        url: `/get-organization`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getMarkRead: builder.query({
      query: () => ({
        url: `/get-message?receiver_id=5`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getChart: builder.query({
      query: ({ role, search = "" }) => ({
        url: `/chat-list?role=${role}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const { usePostMessMutation, useGetSearchNewUserQuery, useGetMessQuery, useGetOrganizationQuery, useGetMarkReadQuery, useGetChartQuery } = dashboardMessageApi;
