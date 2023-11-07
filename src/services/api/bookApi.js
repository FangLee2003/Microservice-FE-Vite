import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const apiURL = import.meta.env.VITE_API_URL

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiURL,
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json"
        },
    }),
    overrideExisting: true,
    endpoints: (builder) => ({
        get: builder.query({
            query: () => `books`,
            method: "GET",
        }),
        getById: builder.query({
            args: {
                url: `books`,
                method: "GET",
            },
            options: (params) => ({
                url: `${params.args.url}/${params.body}`
            }),
            tagType: "Books",
        }),
        add: builder.mutation({
            args: {
                url: `books`,
                method: "POST"
            },
            isInvalidatesTags: true,
            tagType: "Books",
        }),
        update: builder.mutation({
            args: {
                url: `books`,
                method: "PUT"
            },
            isInvalidatesTags: true,
            tagType: "Books",
        }),
        remove: builder.mutation({
            args: {
                url: `books`,
                method: "DELETE",
            },
            options: (params) => ({
                url: `${params.args.url}/${params.body}`
            }),
            isInvalidatesTags: true,
            tagType: "Books",
        }),
    })
});
export const {useGetQuery, useGetByIdQuery, useUpdateMutation, useRemoveMutation} = bookApi;