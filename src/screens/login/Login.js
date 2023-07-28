import { StyleSheet, View, ScrollView, StatusBar, Image } from 'react-native';
import React from 'react';
import { ContainerView } from '../../components';
import { GlobalColors, GlobalFontSizes, GlobalHeights, GlobalWidths, kDefaultPadding } from '../../constants/Styles';
import { GlobalImages } from '../../constants/Images';

import FormLogin from './FormLogin';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Login() {
    return (
        <ContainerView>
            <ScrollView>
                <StatusBar hidden={true} />
                <View style={{ flex: 1 }}>
                    <View style={styles.parentLogo}>
                    <Image source={GlobalImages.IMGLOGO} style={{ width: 100, height: 100 }} />
                    </View>
                    <View style={styles.parentForm}>
                        <FormLogin />
                    </View>
                </View>
            </ScrollView>
        </ContainerView>
    )
}

const styles = StyleSheet.create({
    parentLogo: {
        backgroundColor: 'white',
        height: GlobalHeights[40],
        paddingTop: GlobalHeights[2],
        alignItems: 'center',
        justifyContent: 'center'
    },
    parentForm: {
        height: GlobalHeights[60],
        width: GlobalWidths[100],
        // borderTopLeftRadius: GlobalHeights[5],
        // borderTopRightRadius: GlobalHeights[5],
        paddingHorizontal: kDefaultPadding,
        paddingVertical: GlobalHeights[5],
        backgroundColor: 'white'
    }
})