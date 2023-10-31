import { baseApi } from "src/services/api/base/baseApi"

export const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        login: builder.mutation({
            query(data) {
                const raw = JSON.stringify(data)
                return {
                    url: "authenticate",
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accept: "*/*"
                    },
                    body: raw
                }
            }
        }),

        forgotPW: builder.mutation({
            query(data) {
                return {
                    url: `forgot-password?email=${data.email}`,
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const { useLoginMutation, useForgotPWMutation } = authApi
