import { baseApi } from "../../api/baseApi";



export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOverviewDashboardApi: builder.query({
            query: (period) => ({
                url: `/super-admin-overview?period=${period}`,
                method: 'GET',
            }),
            providesTags: ["super-admin"],
        }),
        getStaticChartDashboardApi: builder.query({
            query: (filter) => ({
                url: `/super-admin-chart?filter=${filter}`,
                method: 'GET',
            }),
            providesTags: ["super-admin"],
        }),


    }),
});

export const {useGetOverviewDashboardApiQuery,useGetStaticChartDashboardApiQuery} = dashboardApi;
