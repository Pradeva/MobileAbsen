import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GlobalColors, GlobalHeights, GlobalWidths } from '../../constants/Styles';
import { InputText, ButtonText, ModalLoader, ModalInformation } from '../../components';
import textStyles from '../../constants/TextStyles';

import axios from 'axios';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/actions/userAction';
import { closeModal } from '../../redux/reducers/alertSlice';
import { ROUTES } from '../../navigations';
import { color } from 'react-native-reanimated';

export default function FormLogin() {
    const navigation = useNavigation()
    const [isShowPass, setIsShowPass] = useState(true)
    const [email, setUserName] = useState('')
    const [password, setUserPass] = useState('')

    // const handleLogin = () => {
    //     // Send a POST request with the user's credentials to the login API endpoint
    //     axios.post('http://192.168.43.22:8000/api/authenticate', { email, password })
    //       .then(response => {
    //         const data = response.data;
            
    //         if (data.success){
    //             navigation.navigate(ROUTES.HOME)
    //             const authToken = response.data.token;
    //         } else {
    //             setLoginError(data.message);
    //         }
    //       })
    //       .catch(error => {
    //         // Handle errors, e.g., show an error message
    //         console.error('Email atau Password salah');
    //         // console.error('Login failed:', error);
    //       });
    //   };

    const { isLoading, dataProfile } = useSelector(state => state.user)
    const { isInformation, alertMessage } = useSelector(state => state.alert)
    const dispatch = useDispatch()

    const onPressSignIn = () => {
        dispatch(fetchLogin({ email, password }))
    }

    useEffect(() => {
        if (dataProfile !== null) {
            navigation.navigate(ROUTES.HOME)
        }
    }, [dataProfile])

    return (
        <>
            <ModalLoader isLoading={isLoading} />
            <Text style={[textStyles.textBold20, { color: GlobalColors.RASTEKTITLE }]}>Login</Text>
            <InputText
                title='User Name'
                textInputConfig={{
                    placeholder: 'Enter your user name',
                    value: email,
                    onChangeText: (text) => setUserName(text),
                    returnKeyType: "next",
                    onSubmitEditing: () => this.passwordInput.focus()
                }}
            />
            <InputText
                title='Password'
                rightIcon={isShowPass ? 'eye' : 'eye-off'}
                onPressIcon={() => setIsShowPass(!isShowPass)}
                textInputConfig={{
                    placeholder: 'Enter your password',
                    secureTextEntry: isShowPass,
                    value: password,
                    onChangeText: (text) => setUserPass(text),
                    returnKeyType: "go",
                    onSubmitEditing: onPressSignIn,
                    ref: (input) => (this.passwordInput = input)
                }}
            />
            <TouchableOpacity
                style={{ marginTop: 10, alignItems: 'flex-end' }}
                onPress={() => { }}
            >
                <Text style={[textStyles.textMd12, { color: '#4d4dff' }]}>Forgot Password?</Text>
            </TouchableOpacity>
            {/* <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText} onPress={handleLogin}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View> */}
            <View style={{ marginTop: 10 }}>
                <ButtonText 
                    style={styles.buttonText} 
                    onPress={onPressSignIn} 
                    Color1={GlobalColors.RASTEKBIRU}
                    Color2={GlobalColors.RASTEKUNGU}
                >
                    Sign In
                </ButtonText>
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={[textStyles.textMd12, { color: GlobalColors.SECONDARY }]}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { }} >
                    <Text style={[textStyles.textBold12, { color: GlobalColors.DANGER }]}>Sign Up</Text>
                </TouchableOpacity>
            </View> */}
            <ModalInformation
                showModal={isInformation}
                message={alertMessage}
                onPressSubmitOk={() => dispatch(closeModal("Information"))}
                onRequestClose={() => dispatch(closeModal("Information"))}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: GlobalHeights[10],
    },
    button: {
    //   backgroundColor: [GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU], // Set the background color of the button
      padding: 10,
      width:250,
      borderRadius: GlobalWidths[2],
    },
    buttonText: {
      color: 'white', // Set the text color of the button
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
  });