import {createSlice} from '@reduxjs/toolkit';
import {authApi} from "src/services/api/authApi";

// interface IUserState {
//     token: string | null;
//     basic: null | any;
// }

// const initialState: IUserState = {
//     token: null,
//     basic: null,
// };

const initialState = {
    token: null,
    basic: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logout: () => initialState,
        setUserState: (state, action) => action.payload,
        setCredentials: (state, action) => {
            const {access_token} = action.payload;
            state.token = access_token;
        },
        setUserBasic: (state, action) => {
            state.basic = {
                ...state.basic,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            const {data} = action.payload;
            if (data !== null && data?.jwtToken) {
                state.token = data.jwtToken;
            }
        });
    }
});

export default userSlice.reducer;

export const {setCredentials, setUserBasic, setUserState} = userSlice.actions;

export const selectCurrentToken = 'user.token'
export const selectUserBasic = 'user.basic';