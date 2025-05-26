import { baseApi } from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: ({ type }) => ({
        url: `/settings?type=${type}`,
        method: "GET",
      }),
    }),
    createSetting: builder.mutation({
      query: (data) => ({
        url: `/create-setting`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSettingQuery, useCreateSettingMutation } = settingsApi;
