import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintains: builder.query({
      query: ({ search, sort }) => ({
        url: `/maintainance?search=${search}&sort=${sort}`,
        method: "GET",
      }),
    }),
    updateMaintains: builder.mutation({
      query: ({ id }) => ({
        url: `/update-maintainance/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetMaintainsQuery, useUpdateMaintainsMutation } = ticketApi;
