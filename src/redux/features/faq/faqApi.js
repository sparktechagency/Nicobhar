import { baseApi } from "../../api/baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => ({
        url: `/faq_list`,
        method: "GET",
      }),
      providesTags: ["FAQ"],
    }),
    addFAQ: builder.mutation({
      query: (data) => ({
        url: `/create-faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),
    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-faq/${id}`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["FAQ"],
    }),

    deleteFAQ: builder.mutation({
      query: ({ id }) => ({
        url: `/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetFAQQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
