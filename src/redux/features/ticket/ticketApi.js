import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTicketList: builder.query({
      query: ({ search, filter }) => ({
        url: `/ticket-list?search=${search}&filter=${filter}`,
        method: "GET",
      }),
    }),
    getTicketDetails: builder.query({
      query: ({ id }) => ({
        url: `/ticket-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTicketListQuery, useGetTicketDetailsQuery } = ticketApi;
