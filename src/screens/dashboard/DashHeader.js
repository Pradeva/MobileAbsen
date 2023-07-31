import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileImage } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalColors, GlobalWidths, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';

export default function DashHeader() {

    const { isLoading, cutiData, dataProfile } = useSelector(state => state.user)
    return (
        <View style={styles.header}>
            <ProfileImage size={GlobalWidths[15]} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[textStyles.textMd13, { color: GlobalColors.SECONDARY }]}>Welcome to Default Apps</Text>
                <Text style={textStyles.textBold20}>{dataProfile.name}</Text>
                <Text style={textStyles.textBold20}>{dataProfile.sisa_cuti}</Text>
                <Text style={textStyles.textBold20}>{dataProfile.jam_lebih}</Text>
                <Text style={textStyles.textBold20}>{dataProfile.jam_kurang}</Text>
                <Text style={textStyles.textBold20}>{dataProfile.jam_lembur}</Text>
            </View>
            <TouchableOpacity style={styles.setting} onPress={() => console.log('Redirect to Profile')}>
                <Icon name='settings-outline' size={GlobalWidths[10] / 2} color={GlobalColors.BUTTON_PRIMARY} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: kDefaultPadding
    },
    setting: {
        width: GlobalWidths[10],
        height: GlobalWidths[10],
        borderRadius: GlobalWidths[10] / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})