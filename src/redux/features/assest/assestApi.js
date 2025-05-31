import { baseApi } from "../../api/baseApi";

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAsset: builder.mutation({
      query: (data) => ({
        url: `/create-asset`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assest"],
    }),
    updateAsset: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-asset/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assest"],
    }),
    importAsset: builder.mutation({
      query: (data) => ({
        url: `/import-asset`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assest"],
    }),
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

export const {
  useGetAssestlistQuery,
  useGetAssetDetailQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useImportAssetMutation,
} = assetApi;
