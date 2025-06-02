import { baseApi } from "../../api/baseApi";


export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLocationDashboardApi: builder.query({
            query: (filter) => ({
                url: `/location-employee-dashboard?filter=${filter}`,
                method: 'GET',
            }),
            providesTags: ["organization"],
        }),
    }),
});

export const {useGetLocationDashboardApiQuery} = dashboardApi;
