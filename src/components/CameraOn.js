import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GlobalColors, GlobalFontSizes, GlobalHeights, GlobalWidths } from '../constants/Styles'
import { RNCamera } from 'react-native-camera';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import ModalLoader from './ModalLoader';
import { useSelector } from 'react-redux'

const widthShapeFace = Math.round(GlobalWidths[100] * 0.45);

export default function CameraOn({
    showCamera,
    onRequestClose,
    refRNCamera,
    onPressSnap,
    onPressChangeType,
    typeCamera,
    showLayout = true,
}) {
    const { loadTakePicture } = useSelector(state => state.alert)
    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={showCamera}
            onRequestClose={onRequestClose}
            style={styles.modalContainer}
            statusBarTranslucent
        >
            <View style={styles.viewContainer}>
                <ModalLoader isLoading={loadTakePicture} frame={false} color={GlobalColors.LIGHT} />
                <RNCamera
                    ref={refRNCamera}
                    style={styles.camera}
                    type={typeCamera}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    captureAudio={false}
                />
                <View style={styles.actions}>
                    <TouchableOpacity onPress={onPressChangeType}>
                        <IconMI name={typeCamera == "back" ? "camera-rear" : "camera-front"} size={GlobalFontSizes[30]} color={GlobalColors.LIGHT}></IconMI>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressSnap}>
                        <IconMI name="camera" size={50} color={GlobalColors.LIGHT}></IconMI>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRequestClose}>
                        <IconMI name="highlight-off" size={GlobalFontSizes[30]} color={GlobalColors.LIGHT} />
                    </TouchableOpacity>
                </View>
                {showLayout ? <View style={styles.layoutFace} /> : null}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: GlobalWidths[100],
        height: GlobalHeights[100]
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: GlobalColors.DARK
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    actions: {
        flex: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10
    },
    layoutFace: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "transparent",
        marginTop: GlobalHeights[15],
        width: widthShapeFace,
        height: widthShapeFace * 1.5,
        borderColor: GlobalColors.DANGER,
        borderWidth: 2,
        borderRadius: widthShapeFace / 2,
        borderStyle: "dashed"
    }
})