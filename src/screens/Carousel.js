import { StyleSheet, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import {Carousel, ContainerView } from '../components';
import textStyles from '../constants/TextStyles';
import { dataCarousel } from '../constants/Api';
//Navigation
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    return (
        <ContainerView>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                <Text style={[textStyles.textBold15, { marginBottom: 10, textAlign: 'center' }]}>Recent News</Text>
                <Carousel data={dataCarousel} autoPlay={true} />
            </ScrollView>
        </ContainerView>
    )
}