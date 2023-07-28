import React from 'react';
import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalImages } from '../constants/Images';
import { GlobalColors, GlobalFontSizes, GlobalHeights, GlobalWidths, kDefaultPadding } from '../constants/Styles';
import textStyles from '../constants/TextStyles';
import ButtonText from './ButtonText';

const ModalForm = ({
    showModal = false,
    buttonAction = true,
    children,
    modalTitle,
    isClose = true,
    onCloseModal,
    onPressSubmit,
    textButton = 'SUBMIT',
    isSearch = false,
    onChangeTextSearch
}) => {
    const btnTextProps = textButton === "CHECK IN" ? { Color1: "#004d00", Color2: "#009900" } : null
    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={showModal}
            onRequestClose={() => console.log("Modal Close")}
            statusBarTranslucent
        >
            <View style={styles.containerModal}>
                <View style={styles.formModal}>
                    <ImageBackground source={GlobalImages.BG_HEAD_MODAL} style={styles.imageContainer}>
                        <Text style={textStyles.textBold18}>{modalTitle}</Text>
                        {isClose &&
                            <TouchableOpacity onPress={onCloseModal}>
                                <Icon name='close-circle' size={GlobalFontSizes[24]} />
                            </TouchableOpacity>
                        }
                    </ImageBackground>
                    {isSearch &&
                        <View style={styles.searchInput}>
                            <TextInput style={{ ...textStyles.textMd13, flex: 1 }} onChangeText={(text) => onChangeTextSearch(text)} />
                            <Icon name='search' size={GlobalFontSizes[20]} color={GlobalColors.SECONDARY} style={{ marginHorizontal: 10 }} />
                        </View>
                    }
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[{ padding: kDefaultPadding, paddingBottom: 0 }, isSearch && { paddingTop: 10 }]}
                    >
                        {children}
                    </ScrollView>
                    {buttonAction ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginTop: 10 }}>
                            <ButtonText
                                onPress={onPressSubmit}
                                styleButton={{ width: '100%' }}
                                {...btnTextProps}
                            >
                                {textButton}
                            </ButtonText>
                        </View> : <View style={{ height: kDefaultPadding }} />
                    }
                </View>
            </View>
        </Modal>
    )
}

export default ModalForm

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: GlobalColors.SECONDARY,
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: kDefaultPadding,
        marginVertical: 10
    },
    containerModal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .6)'
    },
    formModal: {
        width: GlobalWidths[90],
        borderRadius: 12,
        backgroundColor: GlobalColors.BACKGROUND,
        maxHeight: GlobalHeights[75]
    },
    imageContainer: {
        height: 50,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: kDefaultPadding,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3
    },
})