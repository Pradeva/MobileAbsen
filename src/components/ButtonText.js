import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalColors } from '../constants/Styles';
import textStyles from '../constants/TextStyles';
import LinearGradient from "react-native-linear-gradient";

export default function ButtonText({
    children,
    onPress,
    isRounded = false,
    Color1 = GlobalColors.BUTTON_PRIMARY,
    Color2 = GlobalColors.BUTTON_SECONDARY,
    textColor = GlobalColors.LIGHT,
    styleButton,
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
                <Text style={[textStyle, styles.buttonText, { color: textColor }]}>{children}</Text>
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
        marginVertical: 10,
        marginHorizontal: 5,
        overflow: 'hidden'
    },
    buttonInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})