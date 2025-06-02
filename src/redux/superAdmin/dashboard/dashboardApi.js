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
        getTicketStatusDashboardApi: builder.query({
            query: ({start_date,end_date}) => ({
                url: `/ticket-activity-super?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["super-admin"],
        }),


    }),
});

export const {useGetOverviewDashboardApiQuery,useGetStaticChartDashboardApiQuery,useGetTicketStatusDashboardApiQuery} = dashboardApi;
