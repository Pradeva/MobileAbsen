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
        const response = await axios.post('http://10.200.0.18:8000/api/authenticate', { email, password });
        const data = response.data;
    if (data.success) {
        if (data.user.role_id != 1) {
            let profile =
        {
            name : data.user.nama,
            email: data.user.email,
            sisa_cuti : data.user.sisa_cuti,
            jam_lebih : data.user.jam_lebih,
            jam_kurang : data.user.jam_kurang,
            jam_lembur : data.user.jam_lembur,
            password: password,
            id: data.user.id,
            token: data.token,
        };
        await AsyncStorage.setItem('profileAsync', JSON.stringify(profile));
        return profile
        } else {
            thunkAPI.dispatch(openModal({type: "Information", message: "Admin Tidak Boleh Memasuki Aplikasi"}))
        return null    
        }
    } else {
        thunkAPI.dispatch(openModal({type: "Information", message: "Nama Pengguna / Sandi Salah"}))
        return null
    }
} catch (err) {
    thunkAPI.dispatch(openModal({type: "Information", message: "Admin Tidak Boleh Memasuki"}))
    // return thunkAPI.rejectWithValue("Nama Pengguna / Sandi Salah")
    return null
}
})

// export const fetchLogAbsen = createAsyncThunk('user/fetchLogAbsen', async() =>  {
//   try {
//     const response = await axios.get(`http://172.20.10.3:8000/api/log_absen`);
//     console.log(response)
//     const logAbsenData = response.data;
//     return logAbsenData;
// } catch (err) {
//     dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
//     return []
//   } 
// })

export const fetchLogAbsen = createAsyncThunk('user/fetchLogAbsen', async({idUser}, thunkAPI) => {
    try {
        console.log(idUser)
        const response = await fetch(`http://10.200.0.18:8000/api/log_absen?users_id=${idUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer " + token,
            }
        });
        if (response.status === 200) {
            const responseJson = await response.json();
            const dataResponse = responseJson.list
            return dataResponse
        }
        else{
            dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
            return []
        }
    } catch (err) {
        dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
        return []
    } 
})

export const fetchCuti = createAsyncThunk('user/fetchCuti', async({idUser}, thunkAPI) => {
    try {
        console.log(idUser)
        const response = await fetch(`http://10.200.0.18:8000/api/cuti?users_id=${idUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer " + token,
            }
        });
        if (response.status === 200) {
            const responseJson = await response.json();
            const dataResponse = responseJson.list
            return dataResponse
        }
        else{
            dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
            return []
        }
    } catch (err) {
        dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
        return []
    } 
})

export const fetchLembur = createAsyncThunk('user/fetchLembur', async({idUser}, thunkAPI) => {
    try {
        console.log(idUser)
        const response = await fetch(`http://10.200.0.18:8000/api/lembur?users_id=${idUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer " + token,
            }
        });
        if (response.status === 200) {
            const responseJson = await response.json();
            const dataResponse = responseJson.list
            return dataResponse
        }
        else{
            dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
            return []
        }
    } catch (err) {
        dispatch(openModal({type: "Information", message: "Gagal Mengambil Data"}))
        return []
    } 
})

export const fetchLogout = createAsyncThunk('user/fetchLogout', async() => {
    await AsyncStorage.removeItem('profileAsync');
    return null

})