import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTicketList: builder.query({
      query: ({ search, filter, type }) => ({
        url: `/ticket-list?search=${search}&filter=${filter}&type=${type}`,
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
