import { baseApi } from "../../api/baseApi";

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssestlist: builder.query({
      query: ({ page, search, sort_by }) => ({
        url: `/asset-list?page=${page}&search=${search}&sort_by=${sort_by}`,
        method: "GET",
      }),
      providesTags: ["assest"],
    }),
    getAssetDetail: builder.query({
      query: ({ id }) => ({
        url: `/asset-details/${id}`,
        method: "GET",
      }),
      providesTags: ["assest"],
    }),
  }),
});

export const { useGetAssestlistQuery, useGetAssetDetailQuery } = assetApi;
