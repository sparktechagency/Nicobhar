import { baseApi } from "../../api/baseApi";


export const supportedAgentDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChartSupportedAgentDashboardApi: builder.query({
            query: (filter) => ({
                url: `/support-agent-dashboard?filter=${filter}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        getTicketActivitySupportedAgentDashboardApi: builder.query({
            query: ({start_date,end_date}) => ({

                url: `/ticket-activity?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        getInspectionSheetStaticSupportedAgentDashboardApi: builder.query({
            query: () => ({
                url: `/inspection-sheet-statistics`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        getOverviewJobCurdSupportedAgentDashboardApi: builder.query({
            query: () => ({
                url: `/job-card-statistics`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),

    }),
});

export const {useGetChartSupportedAgentDashboardApiQuery,useGetTicketActivitySupportedAgentDashboardApiQuery} = supportedAgentDashboardApi;
