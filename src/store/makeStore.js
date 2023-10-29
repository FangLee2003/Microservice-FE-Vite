import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {userSlice} from "src/services/reducers/user_reducer";
import {createTableEnhancer} from "src/services/api/enhancer";
import {baseApi} from "src/services/api/base/baseApi";
import {baseSlice} from "src/services/reducers/base/baseReducer";

const initReducer = {
    [userSlice.name]: userSlice.reducer,
    [baseSlice.name]: baseSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
}

export const reducers = (reducer) => {
    return combineReducers({
        ...initReducer,
        ...reducer,
    })
}
export const makeStore = () => configureStore({
    reducer: initReducer,
    devTools: true,
    enhancers: [createTableEnhancer],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        baseApi.middleware,
    ),
});

export const store = makeStore();