import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssest: builder.query({
      query: () => ({
        url: "/assest",
        method: "GET",
      }),
      providesTags: ["assest"],
    }),
  }),
});

export const { useGetAssestQuery } = authApi;