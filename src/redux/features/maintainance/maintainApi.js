import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintains: builder.query({
      query: ({ search, sort }) => ({
        url: `/maintainance?search=${search}&sort=${sort}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMaintainsQuery } = ticketApi;
