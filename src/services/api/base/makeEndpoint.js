// import {isEmpty} from "@firebase/util"

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
        async transformResponse(result, meta, arg) {
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(isInvalidatesTags ? result : result.data || [])
                }, 100)
            })
        },
        [isInvalidatesTags ? "invalidatesTags" : "providesTags"]: (
            result,
            error,
            page
        ) => {
            if (!isInvalidatesTags) {
                // return !isEmpty(result) && result?.list
                return result  ?
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
