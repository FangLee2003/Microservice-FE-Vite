export const makeEndpoint = ({args, tagType, options, isInvalidatesTags = false}) => ({
    query(body) {
        const params = new URLSearchParams(body).toString();
        const flex = options ? options({args, body}) : {};
        const option = {...args, ...flex};

        if (args.method?.toLowerCase() === "get") {
            return {
                url: `${option.url}?${params}`,
                method: "GET",
                ...(options ? option : {})
            };
        }

        return {...option, body};
    },
    transformResponse: (result, meta, arg) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve(isInvalidatesTags ? result : result.data || []);
                resolve(result || []);
            }, 1000);
        }),
    [isInvalidatesTags ? "invalidatesTags" : "providesTags"]: (result, error, page) => {
        if (!isInvalidatesTags) {
            return Array.isArray(result) ? [
                    ...result.map(({bookId}) => ({type: tagType, bookId})),
                    {
                        type: tagType,
                        id: "PARTIAL-LIST"
                    }
                ]
                : [{type: tagType, id: "PARTIAL-LIST"}];
        }
        return [
            {type: tagType, page},
            {type: tagType, id: "PARTIAL-LIST"}
        ];
    }
});
