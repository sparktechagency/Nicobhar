import { baseApi } from "../../api/baseApi";

export const jobCardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobCardList: builder.query({
      query: ({ search, filter, type }) => ({
        url: `/card-list?search=${search}&filter=${filter}&type=${type}`,
        method: "GET",
      }),
    }),
    getJobCardDetails: builder.query({
      query: ({ id }) => ({
        url: `/card-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetJobCardListQuery, useGetJobCardDetailsQuery } =
  jobCardsApi;
