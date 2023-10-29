import {createSlice, isAnyOf,} from '@reduxjs/toolkit'
import {verifyKycApi} from "src/services/api/verifyKycApi";

export const tableInitialState = {
    entities: [],
    status: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isFetching: false,
    },
    pagination: {
        page: 0,
        size: 10,
        total: 0
    }
};
//add many endpoints at here
const isGetSuccess = isAnyOf(verifyKycApi.endpoints.getListUserEykc.matchFulfilled,)
export const baseSlice = createSlice({
    name: 'table',
    initialState: tableInitialState,
    reducers: {
        addMany: (state, action) => {
            state.entities = [...state.entities, action.payload.list];
        },
        removeMany: (state, action) => {
            state.entities = state.entities.filter((item) => !action.payload.includes(item.id))
        },
        updateMany: (state, action) => {
            action.payload.forEach((item) => {
                const index = state.entities.findLastIndex((el) => el.id === item.id);
                if (index > -1) {
                    state.entities[index] = item;
                }
            })
        },
        changePage: (state, action) => {
            state.pagination = {
                ...state.pagination,
                page: action.payload
            }
        }
    },
    extraReducers: builder => {
        builder.addMatcher(isGetSuccess, (state, action) => {
            state.pagination = {
                ...state.pagination,
                size: action.payload.size,
                total: action.payload.total,
            }
        })
    }
});

