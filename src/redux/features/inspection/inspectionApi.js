import { baseApi } from "../../api/baseApi";


export const inspectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInspectionApi: builder.mutation({
            query: (createInspectionInfo) => ({
                url: '/create-inspection-sheet',
                method: 'POST',
                body: createInspectionInfo,
            }),
            invalidatesTags: ["inspection"],
        }),
        deleteInspectionApi: builder.mutation({
            query: (id) => ({
                url: `/delete-inspection/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["inspection"],
        }),
        getInspectionApi: builder.query({
            query: ({search="",filter,type,per_page,page}) => ({
                url: `/inspection-list?search=${search}&filter=${filter}&type=${type}&per_page=${per_page}&page=${page}`,
                method: 'GET',
            }),
            invalidatesTags: ["inspection"],
        }),
        // details
        getDetailsInspectionApi: builder.query({
            query: (inspection_id) => ({
                url: `/inspection-details?inspection_id=${inspection_id}`,
                method: 'GET',
            }),
            invalidatesTags: ["inspection"],
        }),
    }),
});

export const { useCreateInspectionApiMutation, useDeleteInspectionApiMutation, useGetInspectionApiQuery, useGetDetailsInspectionApiQuery } = inspectionApi;
