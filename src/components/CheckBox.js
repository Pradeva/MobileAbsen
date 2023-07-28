import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GlobalColors, kDefaultPadding } from '../constants/Styles';
import textStyles from '../constants/TextStyles';

const CheckBox = ({
    containerStyle,
    checked,
    onPress = () => { },
    title,
    checkedColor = GlobalColors.DARK,
    uncheckedColor = GlobalColors.DARK,
    textStyle = textStyles.textMd12
}) => {

    const inActive = { borderWidth: 1.5, borderColor: uncheckedColor }
    const active = { backgroundColor: checkedColor }

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <View style={[styles.viewCheckBox, checked ? active : inActive]}>
                {checked && <Icon name='check' color={GlobalColors.LIGHT} size={13} />}
            </View>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: kDefaultPadding,
        alignItems: 'center'
    },
    viewCheckBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})