import { baseApi } from "../../api/baseApi";



export const ticketsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateTicketApi: builder.mutation({
            query: ({updateTicketInfo,id}) => ({
                url: `/update-ticket/${id}`,
                method: 'POST',
                body: updateTicketInfo,
            }),
            invalidatesTags: ["ticket"],
        }),
        getDetailsTicketApi: builder.query({
            query: (id) => ({
                url: `/ticket-details/${id}`,
                method: 'Get',
            }),
            providesTags: ["ticket"],
        }),
        getTicketApi: builder.query({
            query: () => ({
                url: `/ticket-list`,
                method: 'Get',
            }),
            providesTags: ["ticket"],
        }),
    }),
});

export const { } = ticketsApi;
