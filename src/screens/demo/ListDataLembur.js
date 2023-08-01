import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalLoader } from '../../components';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLembur } from '../../redux/actions/userAction';
import { initialState } from '../../redux/reducers/userSlice';
import moment from 'moment';


const LemburList = ({ data, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={textStyles.textBold15}>{data.users_id} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({moment(data.tanggal).format("dddd, DD MMMM YYYY")})</Text></Text>
            <View style={styles.viewData}>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.jam_awal}</Text>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.jam_akhir}</Text>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.jumlah_jam}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.status_kerja}</Text>
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function ListData() {
    const { isLoading, lemburData, dataProfile } = useSelector(state => state.user)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchLembur({idUser: dataProfile.id}));
    }, []);

    const _onPressList = (data) => {
        console.warn(data.id + ' Has Selected')
    }

    return (
        <ContainerView>
            <ModalLoader isLoading={isLoading}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
                {lemburData.map((data, index) => {
                    return <LemburList key={'pp' + index} data={data} onPress={() => _onPressList(data)} />
                })}
            </ScrollView>
        </ContainerView>
    )
}
    
const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.LIGHT,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        borderRadius: 8
    },
    viewData: {
        flexDirection: 'row',
        // marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}) 