import { baseApi } from "../../api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizationDashboardApi: builder.query({
            query: () => ({
                url: `/organization-dashboard`,
                method: 'GET',
            }),
            providesTags: ["organization"],
        }),
    }),
});

export const {useGetOrganizationDashboardApiQuery} = dashboardApi;
