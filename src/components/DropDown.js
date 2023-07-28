import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalFontSizes, GlobalColors, kDefaultPadding } from '../constants/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import textStyles from '../constants/TextStyles';
import { Loading, ModalForm } from './';

const DropDown = ({
    fullBorder = false,
    title,
    containerStyle,
    titleColor = GlobalColors.DARK,
    onSelected,
    data = [],
    value = '',
    isSearch = false,
    isLoad = false
}) => {

    const [showModal, setShowModal] = useState(false)
    const [dataDropDown, setDataDropDown] = useState([])
    const [labelSelected, setLabelSelected] = useState('')

    const _onSelected = (dataSelected) => {
        setShowModal(false)
        setDataDropDown(data)
        setLabelSelected(dataSelected.label)
        onSelected(dataSelected.value, dataSelected.label)
    }

    const _searchData = (text) => {
        const newData = data.filter(item => {
            // const itemData = `${item.orderNo.toUpperCase()} ${item.status.toUpperCase()} ${item.tipe.toUpperCase()}`;
            const itemData = `${item.label.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setDataDropDown(newData)
    }

    useEffect(() => {
        const obj = data.find(item => item.value === value);
        if(obj !== undefined) setLabelSelected(obj.label)
    }, [])

    useEffect(() => {
        if(value === '') setLabelSelected('')
    }, [value])

    return (
        <>
            <View style={[{ marginTop: kDefaultPadding }, containerStyle]}>
                {title && <Text style={[textStyles.textMd13, { color: titleColor }]}>{title}</Text>}
                <TouchableOpacity
                    style={[styles.inputContainer, fullBorder ? styles.fullBorderInput : styles.bottomBorderInput]}
                    onPress={() => {
                        setShowModal(true)
                        setDataDropDown(data)
                    }}
                    disabled={isLoad}
                >
                    <Text style={{ ...textStyles.textMd13, flex: 1 }}>{labelSelected}</Text>
                    {isLoad ?
                            <Loading type={6} isLoad/>
                        : <Icon
                            name='chevron-down-circle'
                            size={GlobalFontSizes[20]}
                            color={GlobalColors.SECONDARY}
                            style={{ marginHorizontal: 10 }}
                        />
                    }

                </TouchableOpacity>
            </View>
            <ModalForm
                modalTitle={"Pilih " + title}
                showModal={showModal}
                onCloseModal={() => setShowModal(false)}
                buttonAction={false}
                isSearch={isSearch}
                onChangeTextSearch={(text) => _searchData(text)}
            >
                {dataDropDown.map((data, index) => {
                    return (
                        <TouchableOpacity
                            key={'dropDown' + index}
                            style={{ marginBottom: kDefaultPadding }}
                            onPress={() => _onSelected(data)}
                            disabled={data.value === value}
                        >
                            <Text
                                style={[
                                    textStyles.textMd13,
                                    data.value === value ? { color: GlobalColors.GREYBORDER } : null
                                ]}
                            >
                                {data.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ModalForm>
        </>
    )
}

export default DropDown

const styles = StyleSheet.create({
    inputContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: GlobalColors.SECONDARY,
        paddingLeft: 10
    },
    fullBorderInput: {
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 6,
        marginTop: 3
    },
    bottomBorderInput: {
        borderBottomWidth: 1,
    }
})