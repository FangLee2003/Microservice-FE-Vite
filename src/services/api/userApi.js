import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const apiURL = import.meta.env.VITE_API_URL

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
        // mode: 'no-cors',
        headers: {
            "Content-Type": "application/json"
        },
    }),
    overrideExisting: true,
    endpoints: (builder) => ({
        get: builder.query({
            query: () => `employees`,
            method: "GET",
        }),
        getById: builder.query({
            args: {
                url: `employees`,
                method: "GET",
            },
            options: (params) => ({
                url: `${params.args.url}/${params.body}`
            }),
            tagType: "Employees",
        }),
        add: builder.mutation({
            args: {
                url: `employees`,
                method: "POST"
            },
            isInvalidatesTags: true,
            tagType: "Employees",
        }),
        update: builder.mutation({
            args: {
                url: `employees`,
                method: "PUT"
            },
            isInvalidatesTags: true,
            tagType: "Employees",
        }),
        remove: builder.mutation({
            query: ({employeeId})=>({
                url: `employees/${employeeId}`,
                method: "DELETE",
            }),
            isInvalidatesTags: true,
            tagType: "Employees",
        }),
    })
});
export const {useGetQuery, useGetByIdQuery, useUpdateMutation, useRemoveMutation} = userApi;