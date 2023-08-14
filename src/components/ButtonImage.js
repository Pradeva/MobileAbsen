import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { GlobalColors } from '../constants/Styles';
import textStyles from '../constants/TextStyles';
import LinearGradient from "react-native-linear-gradient";

export default function ButtonImage({
    children,
    onPress,
    isRounded = false,
    Color1 = GlobalColors.BUTTON_PRIMARY,
    Color2 = GlobalColors.BUTTON_SECONDARY,
    textColor = GlobalColors.LIGHT,
    styleButton,
    imageSize = { height: 100, width: 100 },
    textStyle = textStyles.textBold16
}) {
    return (
        <LinearGradient
            style={[
                styles.buttonOuterContainer,
                isRounded ? styles.buttonRounded : null,
                styleButton
            ]}
            colors={[Color1, Color2]}
            start={{ x: 0, y: 0.5 }}
        >
            <TouchableOpacity style={styles.buttonInnerContainer} onPress={onPress}>
                <Image source={children} style={[ imageSize]}/>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    buttonRounded: {
        borderRadius: 28,
    },
    buttonOuterContainer: {
        borderRadius: 6,
        marginVertical: 0,
        marginHorizontal: 0,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        paddingVertical: 0,
        paddingHorizontal: 0
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
})