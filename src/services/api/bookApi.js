import {baseApi} from "src/services/api/base/baseApi";
import {makeEndpoint} from "src/services/api/base/makeEndpoint";

export const bookApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        get: builder.query(makeEndpoint({
            args: {
                url: "books",
                method: "GET",
            },
            tagType: "Books",
        })),
        getById: builder.query(makeEndpoint({
            args: {
                url: `books`,
                method: "GET",
            },
            options: (params) => ({
                url: `${params.args.url}/${params.body}`
            }),
            tagType: "Books",
        })),
        add: builder.mutation(makeEndpoint({
            args: {
                url: `books`,
                method: "POST"
            },
            isInvalidatesTags: true,
            tagType: "Books",
        })),
        update: builder.mutation(makeEndpoint({
            args: {
                url: `books`,
                method: "PUT"
            },
            isInvalidatesTags: true,
            tagType: "Books",
        })),
        remove: builder.mutation(makeEndpoint({
            args: {
                url: `books`,
                method: "DELETE",
            },
            options: (params) => ({
                url: `${params.args.url}/${params.body}`
            }),
            isInvalidatesTags: true,
            tagType: "Books",
        })),
    })
});
