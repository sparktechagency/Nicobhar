import { baseApi } from "../../api/baseApi";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: () => ({
        url: `/asset`,
        method: "GET",
      }),
    }),
    getTechnician: builder.query({
      query: () => ({
        url: `/technician`,
        method: "GET",
      }),
    }),
    getMaintains: builder.query({
      query: ({ search, sort }) => ({
        url: `/maintainance?search=${search}&sort=${sort}`,
        method: "GET",
      }),
      providesTags: ["maint"],
    }),
    getMainDays: builder.query({
      query: ({ type }) => ({
        url: `/maintainance?maintainance_type=${type}`,
        method: "GET",
      }),
      providesTags: ["maint"],
    }),
    updateMaintains: builder.mutation({
      query: ({ id }) => ({
        url: `/update-maintainance/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["maint"],
    }),
    updateDay: builder.mutation({
      query: (data) => ({
        url: `/update-maintainance-day`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["maint"],
    }),
    setReminder: builder.mutation({
      query: (data) => ({
        url: `/set-reminder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["maint"],
    }),
  }),
});

export const {
  useGetMaintainsQuery,
  useUpdateMaintainsMutation,
  useGetMainDaysQuery,
  useUpdateDayMutation,
  useGetAssetsQuery,
  useGetTechnicianQuery,
  useSetReminderMutation,
} = ticketApi;
