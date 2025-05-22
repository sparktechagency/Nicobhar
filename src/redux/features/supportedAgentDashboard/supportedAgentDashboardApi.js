import { baseApi } from "../../api/baseApi";


export const supportedAgentDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChartSupportedAgentDashboardApi: builder.query({
            query: () => ({
                url: `/support-agent-dashboard`,
                method: 'GET',
            }),
            providesTags: ["supted-agent-dashboard"],
        }),
        getTicketActivitySupportedAgentDashboardApi: builder.query({
            query: ({start_date,end_date}) => ({
                url: `/ticket-activity?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent-dashboard"],
        }),
        getInspectionSheetStaticSupportedAgentDashboardApi: builder.query({
            query: () => ({
                url: `/inspection-sheet-statistics`,
                method: 'GET',
            }),
            providesTags: ["supted-agent-dashboard"],
        }),
        getOverviewJobCurdSupportedAgentDashboardApi: builder.query({
            query: () => ({
                url: `/job-card-statistics`,
                method: 'GET',
            }),
            providesTags: ["supted-agent-dashboard"],
        }),

    }),
});

export const { } = supportedAgentDashboardApi;
