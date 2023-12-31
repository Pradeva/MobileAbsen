import { StyleSheet, StatusBar, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ButtonText, Carousel, ContainerView, ModalLoader } from '../../components';
import DashHeader from './DashHeader';
import textStyles from '../../constants/TextStyles';
import { dataCarousel } from '../../constants/Api';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigations';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../redux/actions/userAction';

export default function Dashboard() {
    const navigation = useNavigation()
    const { dataProfile, isLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataProfile === null) {
            navigation.navigate(ROUTES.LOGIN)
        }
    }, [dataProfile])

    const logout = () => {
        dispatch(fetchLogout())
    }

    return (
        <ContainerView>
            <ModalLoader isLoading={isLoading} />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                <StatusBar hidden={true} />
                <DashHeader />

                <Text style={[textStyles.textBold15, { marginBottom: 10, textAlign: 'center' }]}>Recent News</Text>
                <Carousel data={dataCarousel} autoPlay={true} />

                <ButtonText onPress={logout}>Logout</ButtonText>
            </ScrollView>
        </ContainerView>
    )
}

const styles = StyleSheet.create({
})