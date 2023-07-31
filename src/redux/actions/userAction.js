import {createAsyncThunk} from "@reduxjs/toolkit";
import {openModal} from "../reducers/alertSlice";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const generateCaptcha = () => {
    // Generate Random of Captcha
    let charsArray = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = [];
    let textCaptcha = ""
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array

        // Generate Random of Captcha Color
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        textCaptcha += charsArray[index];
        captcha.push({text: charsArray[index], textColor: color});
    }
    return ({arrCaptcha: captcha, captcha: textCaptcha})
}

export const initLogin = createAsyncThunk('user/initLogin', async() => {
    const profile = await AsyncStorage.getItem('profileAsync')
    return JSON.parse(profile)
})

export const fetchLogin = createAsyncThunk('user/fetchLogin', async({
    email,
    password
}, thunkAPI) => {
    try {
        const response = await axios.post('http://192.168.43.22:8000/api/authenticate', { email, password });
        const data = response.data;
    if (data.success) {
        let profile =
        {
            email: data.user.email,
            password: password,
            id: data.user.id,
            token: data.token,
        };
        await AsyncStorage.setItem('profileAsync', JSON.stringify(profile));
        return profile
    } else {
        thunkAPI.dispatch(openModal({type: "Information", message: "Nama Pengguna / Sandi Salah"}))
        return null
    }
} catch (err) {
    thunkAPI.dispatch(openModal({type: "Information", message: "Nama Pengguna / Sandi Salah"}))
    // return thunkAPI.rejectWithValue("Nama Pengguna / Sandi Salah")
    return null
}
})

export const fetchLogAbsen = createAsyncThunk('user/fetchLogAbsen', async() =>  {
  try {
    const response = await axios.get(`http://192.168.43.22:8000/api/log_absen`);
    const logAbsenData = response.data;
    dispatch({ type: 'SET_LOG_ABSEN', payload: logAbsenData });
} catch (err) {
    dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
    return null
  } 
})

export const fetchLogout = createAsyncThunk('user/fetchLogout', async() => {
await AsyncStorage.removeItem('profileAsync');
return null
})