import { createSlice } from "@reduxjs/toolkit";
import { initLogin, fetchLogin, fetchLogout, generateCaptcha, fetchLogAbsen } from "../actions/userAction";

export const initialState = {
    dataProfile: null,
    logAbsen : [],
    isLoading: false,
    dataCaptcha: [],
    textCaptcha: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCaptcha: (state, action) => {
            const generate = generateCaptcha()
            state.dataCaptcha = generate.arrCaptcha;
            state.textCaptcha = generate.captcha;
        },
        setLoggedInUserId: (state, action) => {
            state.loggedInUserId = action.payload;
        },
    },
    extraReducers: (builder) => {
        //initLogin
        builder.addCase(initLogin.fulfilled, (state, action) => {
            state.dataProfile = action.payload;
        })
        //fetchLogin
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.dataProfile = action.payload;
            initialState.dataProfile = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchLogAbsen.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLogAbsen.fulfilled, (state, action) => {
            state.logAbsen = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchLogAbsen.rejected, (state, action) => {
            state.isLoading = false;
        })
        
        //fetchLogout
        builder.addCase(fetchLogout.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataProfile = action.payload;
        })
    },
})

export const { getCaptcha } = userSlice.actions;
export const { setLoggedInUserId } = userSlice.actions;
export default userSlice.reducer;