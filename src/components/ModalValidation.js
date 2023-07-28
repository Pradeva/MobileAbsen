import { StyleSheet, Text, View, Modal, Image, ImageBackground } from 'react-native';
import React from 'react';
import moment from 'moment';
import { GlobalColors, GlobalWidths, kDefaultPadding } from '../constants/Styles';
import { GlobalImages } from '../constants/Images';
import ButtonText from './ButtonText';
import textStyles from '../constants/TextStyles';

export default function ModalValidation({
    showModal = false,
    message,
    showDate = false,
    onPressSubmitOk,
    textSubmitOk = "OK"
}) {
    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={showModal}
            onRequestClose={() => console.log('modal has hided')}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.formModal}>
                    <ImageBackground source={GlobalImages.BG_HEAD_MODAL} style={styles.imageContainer}>
                        <Image style={styles.image} source={GlobalImages.LOGO_MSQUATBRAVO_RED} />
                    </ImageBackground>
                    <Text style={[textStyles.textMd13, styles.message]}>{message}</Text>
                    {showDate && <Text style={[textStyles.textMd10, styles.labelDate]}>{moment().format("DD MMMM YYYY, HH:mm:ss")}</Text>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <ButtonText onPress={onPressSubmitOk} styleButton={{ width: '100%' }}>
                            {textSubmitOk}
                        </ButtonText>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .6)'
    },
    formModal: {
        width: GlobalWidths[90],
        borderRadius: 12,
        backgroundColor: GlobalColors.BACKGROUND
    },
    imageContainer: {
        height: 50,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    image: {
        resizeMode: "center",
        width: '75%',
        height: '70%'
    },
    message: {
        paddingTop: kDefaultPadding,
        paddingBottom: 10,
        paddingHorizontal: kDefaultPadding
    },
    labelDate: {
        margin: 10,
        marginBottom: 0,
        textAlign: 'right'
    }
})