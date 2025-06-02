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
        getInspectionActivityApi: builder.query({
            query: () => ({
                url: `/inspaction-sheet-overview?start_date=2024-05-10&end_date=2025-05-20`,
                method: 'GET',
            }),
            providesTags: ["organization"],
        }),
    }),
});

export const { useGetOrganizationDashboardApiQuery,useGetInspectionActivityApiQuery } = dashboardApi;
