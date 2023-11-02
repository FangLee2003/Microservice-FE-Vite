import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "src/services/api/base/baseQuery";

export const tagTypes = ['Books'];
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes,
    endpoints: (builder) => ({}),
});