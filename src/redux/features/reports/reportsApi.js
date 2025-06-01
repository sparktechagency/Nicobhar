import { baseApi } from "../../api/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (data) => ({
        url: "/create-report",
        method: "POST",
        body: data,
      }),
    }),
    getReport: builder.query({
      query: (params) => {
        const url = `/make-report`;
        console.log(
          "Requesting URL:",
          `${url}?${new URLSearchParams(params).toString()}`
        );
        return {
          url,
          method: "GET",
          params,
        };
      },
      // You can also log here if you want to see the *resolved* URL after RTK Query processes it
      async onQueryStarted(params, { queryFulfilled }) {
        const url = `/make-report`; // Reconstruct the URL for logging
        const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
        console.log("onQueryStarted - Full URL:", fullUrl);

        try {
          await queryFulfilled;
          // You could also log success here if needed
        } catch (error) {
          // Log errors if the request fails
          console.error(
            "onQueryStarted - Request failed for URL:",
            fullUrl,
            error
          );
        }
      },
    }),
  }),
});

export const { useCreateReportMutation, useGetReportQuery } = reportsApi;
