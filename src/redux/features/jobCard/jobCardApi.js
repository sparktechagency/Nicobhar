import { baseApi } from "../../api/baseApi";

export const jobCurdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createJobCurdApi: builder.mutation({
            query: (createJobCurdInfo) => ({
                url: '/create-job-card',
                method: 'POST',
                body: createJobCurdInfo,
            }),
            invalidatesTags: ["jobCurd"],
        }),
        updateJobCurdApi: builder.mutation({
            query: (id) => ({
                url: `/update-card/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ["jobCurd"],
        }),
        deleteJobCurdApi: builder.mutation({
            query: (id) => ({
                url: `/delete-card/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["jobCurd"],
        }),
        getJobCurdApi: builder.query({
            query: () => ({
                url: `/card-list`,
                method: 'GET',
            }),
            providesTags: ["jobCurd"],
        }),
        getDetailsJobCurdApi: builder.query({
            query: (id) => ({
                url: `/card-details/${id}`,
                method: 'GET',
            }),
            providesTags: ["jobCurd"],
        }),
    }),
});

export const {} = jobCurdApi;
