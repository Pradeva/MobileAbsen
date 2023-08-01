import { createSlice } from "@reduxjs/toolkit";
import { initLogin, fetchLogin, fetchLogout, generateCaptcha, fetchLogAbsen, fetchCuti, fetchLembur } from "../actions/userAction";

export const initialState = {
    dataProfile: null,
    logAbsenData : [],
    cutiData : [],
    lemburData : [],
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
        }
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
        //fetchAbsen
        builder.addCase(fetchLogAbsen.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchLogAbsen.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLogAbsen.fulfilled, (state, action) => {
            state.logAbsenData = action.payload;
            state.isLoading = false;
        })
        //fetchCuti
        builder.addCase(fetchCuti.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchCuti.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCuti.fulfilled, (state, action) => {
            state.cutiData = action.payload;
            state.isLoading = false;
        })
        //fetchLembur
        builder.addCase(fetchLembur.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchLembur.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLembur.fulfilled, (state, action) => {
            state.lemburData = action.payload;
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
export default userSlice.reducer;