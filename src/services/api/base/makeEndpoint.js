export const makeEndpoint = ({
                                 args,
                                 tagType,
                                 options,
                                 isInvalidatesTags = false
                             }) => {
    return {
        query(body) {
            const params = new URLSearchParams(body).toString()
            const convert = () => {
                const flex = options ? options({args, body}) : {}
                return {
                    ...args,
                    ...flex
                }
            }
            const option = convert()
            if (args.method?.toLowerCase() === "get") {
                return {
                    url: `${option.url}?${params}`,
                    method: "GET",
                    ...(options ? option : {})
                }
            }
            return {
                ...option,
                body
            }
        },
        transformResponse(result, meta, arg) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(isInvalidatesTags ? result : result.data || []);
                }, 100);
            });
        },
        [isInvalidatesTags ? "invalidatesTags" : "providesTags"]: (
            result,
            error,
            page
        ) => {
            if (!isInvalidatesTags) {
                return result ?
                    [
                        ...result.map(({id}) => ({type: tagType, id})),
                        {
                            type: tagType,
                            id: "PARTIAL-LIST"
                        }
                    ]
                    : [{type: tagType, id: "PARTIAL-LIST"}]
            }
            return [
                {type: tagType, page},
                {type: tagType, id: "PARTIAL-LIST"}
            ]
        }
    }
}
