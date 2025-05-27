import { baseApi } from "../../api/baseApi";


export const dashboardMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postMess: builder.mutation({
      query: () => ({
        url: `/send-message`,
        method: "POST",
      }),
      invalidatesTags: ["message"],
    }),
    getSearchNewUser: builder.query({
      query: () => ({
        url: `/search-new-user?role=technician`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getMess: builder.query({
      query: () => ({
        url: `/get-message?receiver_id=15&per_page=10`,
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
        url: `/get-message?receiver_id=2`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getChart: builder.query({
      query: () => ({
        url: `/chat-list`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const {usePostMessMutation,useGetSearchNewUserQuery,useGetMessQuery,useGetOrganizationQuery,useGetMarkReadQuery,useGetChartQuery} = dashboardMessageApi;
