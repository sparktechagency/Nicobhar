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
            query: ({ start_date, end_date }) => ({

                url: `/ticket-activity?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        getInspectionSheetStaticSupportedAgentDashboardApi: builder.query({
            query: ({ start_date, end_date }) => ({
                url: `/inspection-sheet-statistics?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        getOverviewJobCurdSupportedAgentDashboardApi: builder.query({
            query: ({ start_date, end_date }) => ({
                url: `/job-card-statistics?start_date=${start_date}&end_date=${end_date}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        newDetailsSupportedAgentDashboardApi: builder.query({
            query: (inspection_id) => ({
                url: `/inspection-details?inspection_id=${inspection_id}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        openDetailsSupportedAgentDashboardApi: builder.query({
            query: (inspection_id) => ({
                url: `/inspection-details?inspection_id=${inspection_id}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),
        pastDetailsSupportedAgentDashboardApi: builder.query({
            query: (inspection_id) => ({
                url: `/inspection-details?inspection_id=${inspection_id}`,
                method: 'GET',
            }),
            providesTags: ["supted-agent"],
        }),

    }),
});

export const { useGetChartSupportedAgentDashboardApiQuery, useGetTicketActivitySupportedAgentDashboardApiQuery, useGetInspectionSheetStaticSupportedAgentDashboardApiQuery, useGetOverviewJobCurdSupportedAgentDashboardApiQuery,
    useNewDetailsSupportedAgentDashboardApiQuery,
    useOpenDetailsSupportedAgentDashboardApiQuery,
    usePastDetailsSupportedAgentDashboardApiQuery,
} = supportedAgentDashboardApi;
