// import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";
import {setCredentials} from "src/services/reducers/user_reducer"

const apiURL = import.meta.env.VITE_API_URL

export const baseQuery = async (args, api, extraOptions) => {
    // @ts-ignore
    const {method, url, body} = args
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", `application/json`)
    // @ts-ignore
    const token = api.getState().user.token
    let raw = body
    if (token !== null) {
        myHeaders.append("Authorization", `Bearer ${token}`)
        raw = JSON.stringify(body)
    }
    const requestOptions = {
        method,
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }
    // @ts-ignore
    const result = await fetch(`${apiURL}/${url}`, {...requestOptions})
    if (result.status === 401) {
        api.dispatch(setCredentials({access_token: ""}))
    }
    return {data: await result.json()}
}
