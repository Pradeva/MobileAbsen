import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { GlobalColors, kDefaultPadding } from '../constants/Styles';
import textStyles from '../constants/TextStyles';

export default function InputSelected({
    fullBorder = false,
    title,
    titleColor = GlobalColors.DARK,
    selectedValue,
    onValueChange,
    dataList,
    style
}) {
    return (
        <View style={[{ marginTop: kDefaultPadding }, style]}>
            <Text style={[textStyles.textMd13, { color: titleColor }]}>{title}</Text>
            <View style={[styles.inputContainer, fullBorder ? styles.fullBorderInput : styles.bottomBorderInput]}>
                <Picker
                    style={{ flex: 1, color: selectedValue == "" ? GlobalColors.GREYBORDER : GlobalColors.DARK, width: '100%' }}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                        onValueChange(itemValue)
                    }
                >
                    <Picker.Item color={GlobalColors.GREYBORDER} label={"Pilih " + title} value="" />
                    {dataList.map((data, index) =>
                        <Picker.Item key={'dropdown' + index} label={data.label} value={data.value} />
                    )}
                </Picker>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: GlobalColors.SECONDARY,
        marginTop: 3
    },
    fullBorderInput: {
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 6
    },
    bottomBorderInput: {
        borderBottomWidth: 1,
    },
    textInput: {
        flex: 1,
        padding: 0
    }
})