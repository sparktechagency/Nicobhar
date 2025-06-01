import { baseApi } from "../../api/baseApi";

export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query({
      query: () => ({
        url: "/get-organization",
        method: "GET",
      }),
      providesTags: ["prov"],
    }),
    getProviders: builder.query({
      query: ({ role, search, sort }) => ({
        url: `/get-providers?role=${role}&search=${search}&sort=${sort}`,
        method: "GET",
      }),
      providesTags: ["prov"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `/add-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["prov"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => {
        console.log("Updating user with data:", data);
        return {
          url: `/update-user/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["prov"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["prov"],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useGetProvidersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = providersApi;
