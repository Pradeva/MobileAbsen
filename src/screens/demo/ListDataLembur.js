import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalLoader, ModalForm, ButtonText, InputText, InputDate, DropDown } from '../../components';
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
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [userId, setUserId] = useState('');
    const [jamAwal, setJamAwal] = useState('');
    const [jamAkhir, setJamAkhir] = useState('');
    const [jumlahJam, setJumlahJam] = useState('');
    const [statusKerja, setStatusKerja] = useState('');
    const [status, setStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        dispatch(fetchLembur({idUser: dataProfile.id}));
    }, []);

    const _onPressList = (data) => {
        setUserId(dataProfile.id.toString())
        setJamAwal(data.jam_awal);
        setJamAkhir(data.jam_akhir);
        setJumlahJam(data.jumlah_jam);
        setStatusKerja(data.status_kerja);
        setStatus(data.status);
        setIsModalVisible2(true); //detail
    }
    const handleOpenModal = () => {
        setIsModalVisible1(true); //form input
        setUserId(dataProfile.id.toString())
      };

    const DropDownOptions =[
        {label : "Di rumah", value : 1},
        {label : "Di kantor", value : 2},
    ];

    const handleOptionSelected = (value, label) => {
        setStatusKerja(value);
      };

    return (
        <ContainerView>
            <ModalLoader isLoading={isLoading}/>
            <ButtonText
                style={styles.buttonText} 
                Color1={GlobalColors.RASTEKBIRU}
                Color2={GlobalColors.RASTEKUNGU}
                onPress={()=>handleOpenModal()}
            >
                Pengajuan Lembur
            </ButtonText>
            <ModalForm
                isVisible={isModalVisible2}
                onCloseModal={() => setIsModalVisible2(false)}
                modalTitle={"Detail Lembur"}
                textButton={"CLOSE"}
            >
                <Text style={{...textStyles.textBold13,}}>User ID : {userId}</Text>
                <Text style={{...textStyles.textBold13,}}>Jam Awal : {jamAwal}</Text>
                <Text style={{...textStyles.textBold13,}}>Jam Akhir : {jamAkhir}</Text>
                <Text style={{...textStyles.textBold13,}}>Jumlah Jam : {jumlahJam}</Text>
                <Text style={{...textStyles.textBold13,}}>Status Kerja : {statusKerja}</Text>
                <Text style={{...textStyles.textBold13,}}>Status : {status}</Text>
            </ModalForm>
            <ModalForm 
                isVisible={isModalVisible1} 
                onCloseModal={() => setIsModalVisible1(false)}
                modalTitle={"Pengajuan Lembur"}
            >
                <InputText 
                    fullBorder
                    title='ID USER'
                    textInputConfig={{
                        placeholder: 'Enter your user name',
                        value: userId,
                        editable: false,
                        onChangeText: (val) => setUserId(val), 
                    }}
                />
                {/* <InputDate
                    title="TANGGAL LEMBUR"
                    onDateChange={(date) => setSelectedDate(date)}
                    textInputConfig={{
                    placeholder: 'Masukkan tanggal',
                    value: selectedDate ? selectedDate.toDateString() : '', 
                    editable: false, 
                    }}
                /> */}
                <InputDate
                    title='TANGGAL LEMBUR'
                    onDateChange={(date) => {
                        setSelectedDate(date)
                        // setEndDate(null)
                    }}
                    value={selectedDate}
                />
                <InputText 
                    fullBorder
                    title='JAM AWAL'
                    textInputConfig={{
                        placeholder: 'Masukkan jam awal',
                        onChangeText: (val) => setJamAwal(val), 
                    }}
                />
                <InputText 
                    fullBorder
                    title='JAM AKHIR'
                    textInputConfig={{
                        placeholder: 'Masukkan jam akhir',
                        onChangeText: (val) => setJamAkhir(val), 
                    }}
                />
                <DropDown
                    fullBorder
                    title="STATUS KERJA"
                    data={DropDownOptions}
                    onSelected={handleOptionSelected}
                    value={statusKerja}
                />
            </ModalForm>
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