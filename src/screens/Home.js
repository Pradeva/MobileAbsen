import { StyleSheet, StatusBar, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ButtonText, ContainerView, ModalLoader } from '../components';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../navigations';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogout } from '../redux/actions/userAction';

const handleLogout = async () => {
    // Dispatch the logout action
    await dispatch(fetchLogout());

    // Navigate to the login page after logout
    navigation.navigate(ROUTES.LOGIN);
};

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return (
        <ContainerView>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                <StatusBar hidden={true} />
                <ButtonText onPress={() => navigation.navigate(ROUTES.DASHBOARD_HEADER)}>Dashboard Header</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.BLUETOOTH)}>Bluetooth BLE</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.CAROUSEL)}>Carousel</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.MQTT)}>MQTT</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>List View Data Presensi</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.CUTI)}>List View Data Cuti</ButtonText>
                <ButtonText onPress={() => navigation.navigate(ROUTES.LEMBUR)}>List View Data Lembur</ButtonText>
                <ButtonText onPress={() => dispatch(fetchLogout())}>SIGN OUT</ButtonText>
            </ScrollView>
        </ContainerView>
    )
}

const styles = StyleSheet.create({
})