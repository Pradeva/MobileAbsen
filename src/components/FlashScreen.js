import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import { GlobalColors, GlobalFontSizes } from '../constants/Styles';
import { GlobalImages } from '../constants/Images';
import textStyles from '../constants/TextStyles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FlashScreen() {
    return (
        <LinearGradient
            style={styles.container}
            colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
            start={{ x: 0.5, y: 0.1 }}
        >
            <StatusBar hidden={false} />
            <Image source={GlobalImages.IMGLOGO} style={{ width: 100, height: 100 }} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageZ: {
        position: 'absolute',
        bottom: 10,
        height: "10%",
        width: "40%"
    },
})