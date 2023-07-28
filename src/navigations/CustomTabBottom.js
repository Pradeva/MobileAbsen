import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { GlobalColors, GlobalFontSizes } from '../constants/Styles';
import { GlobalImages } from '../constants/Images';
import { GradientView } from '../components';

const CustomTabBottom = ({ onPress, selected }) => {

    if (selected) {
        return (
            <TouchableOpacity onPress={onPress} >
                <GradientView style={styles.container}>
                    <Icon name='thunderstorm' size={GlobalFontSizes[30]} color={GlobalColors.LIGHT} />
                    {/* <Image source={GlobalImages.IC_TELPRO} style={styles.image} resizeMode='contain' /> */}
                </GradientView>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={onPress} >
                <GradientView style={styles.container} colors={["#ffffff", GlobalColors.BUTTON_PRIMARY]}>
                    <Icon name='thunderstorm-outline' size={GlobalFontSizes[30]} color={GlobalColors.DARK} />
                    {/* <Image source={GlobalImages.IC_TELPRORED} style={styles.image} resizeMode='contain' /> */}
                </GradientView>
            </TouchableOpacity>
        )
    }
}

export default CustomTabBottom

const styles = StyleSheet.create({
    container: {
        bottom: 20,
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradientView: {
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 35,
        width: 35
    }
})