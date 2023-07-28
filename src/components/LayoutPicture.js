import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import ImageMarker, {Position, ImageFormat} from "react-native-image-marker"
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import { GlobalColors, GlobalFont, GlobalFontSizes } from '../constants/Styles';
import CameraOn from './CameraOn';
//Redux
import { useCamera } from 'react-native-camera-hooks';
import { useDispatch } from 'react-redux';
import { openLoadTakePicture, closeLoadTakePicture } from '../redux/reducers/alertSlice';

export default function LayoutPicture({
    stylePicture = { width: '30%', height: 150 },
    title='',
    onPress,
    iconName = "image",
    iconSize = 45,
    showLayout = true,
    uriImage = null,
    customTextWM = '',
    disabled = false
}) {
    const [{ cameraRef }, { takePicture }] = useCamera(null)
    const dispatch = useDispatch()

    const [showCamera, setShowCamera] = useState(false)
    const [typeCamera, setTypeCamera] = useState('back')
    const [latitude, setLatitude] = useState(-6.938969)
    const [longitude, setLongitude] = useState(107.631170)

    const _changeCameraType = () => {
        if (typeCamera === "back") {
            setTypeCamera("front");
        } else {
            setTypeCamera("back");
        }
    }

    const _showCamera = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
                setShowCamera(true)
            },
            (error) => {
                console.log(error)
                setShowCamera(true)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const _captureHandle = async () => {
        try {
            dispatch(openLoadTakePicture())
            const data = await takePicture({
                width: 480,
                base64: true,
                mirrorImage: false,
                quality: 0.5,
                forceUpOrientation: true,
                fixOrientation: true,
                orientation: "portrait"
            })
            
            let textWaterMark = '' + moment().format("ddd, DD MMMM YYYY, HH:mm:ss") + '\nlat:' + latitude + '\nlon:' + longitude
            if(customTextWM !== '') textWaterMark = customTextWM + '\n' + textWaterMark
            
            const waterMarkImage = await ImageMarker.markText({
                src: data.uri,
                text: textWaterMark,
                position: Position.bottomLeft,
                color: '#e6e6e6',
                fontName: 'Arial-BoldItalicMT',
                fontSize: 16,
                scale: 1,
                quality: 60,
                saveFormat: ImageFormat.base64
            })

            const base64Img = waterMarkImage.replace("data:image/png;base64,", "")
            dispatch(closeLoadTakePicture())
            setShowCamera(false)
            onPress(base64Img, latitude, longitude)
        } catch (error) {
            dispatch(closeLoadTakePicture())
            setShowCamera(false)
            // console.log(error)
        }
    };

    const _renderPicture = () => {
        if (uriImage === null) {
            return (
                <TouchableOpacity
                    style={[styles.viewForAddFotoSty, stylePicture]}
                    onPress={() => _showCamera()}
                    disabled={disabled}
                >
                    <IconFA5 name={iconName} size={iconSize} color={GlobalColors.GREYBORDER}></IconFA5>
                    <Text style={styles.labelTextAddFotoSty}>{title}</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity
                    style={{ ...stylePicture, borderRadius: 8 }}
                    onPress={() => _showCamera()}
                    disabled={disabled}
                >
                    <Image
                        style={styles.imageView}
                        source={{ uri: `data:image/jpeg;base64,${uriImage}` }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )
        }
    }
    return (
        <>
            {_renderPicture()}
            <CameraOn
                showCamera={showCamera}
                typeCamera={typeCamera}
                onRequestClose={() => setShowCamera(false)}
                refRNCamera={cameraRef}
                onPressSnap={() => _captureHandle()}
                onPressChangeType={() => _changeCameraType()}
                showLayout={showLayout}
            />
        </>
    )
}

const styles = StyleSheet.create({
    viewForAddFotoSty: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: GlobalColors.GREYBORDER,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderRadius: 8,
        // backgroundColor: GlobalColors.LIGHT
    },

    labelTextAddFotoSty: {
        color: GlobalColors.GREYBORDER,
        fontFamily: GlobalFont.Gotham.medium,
        fontSize: GlobalFontSizes[13],
        marginTop: 3,
        textAlign: "center"
    },

    imageView: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
})