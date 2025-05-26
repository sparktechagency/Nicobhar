import { baseApi } from "../../api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["notif"],
    }),
    markNotification: builder.mutation({
      query: ({ id }) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["notif"],
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkNotificationMutation } =
  notificationApi;
