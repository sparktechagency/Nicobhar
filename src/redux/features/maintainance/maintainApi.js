import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaintains: builder.query({
      query: () => ({
        url: `/maintainance`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMaintainsQuery } = ticketApi;
