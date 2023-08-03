import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalForm, ModalLoader, InputText, ButtonText, InputDate } from '../../components';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCuti, postCuti } from '../../redux/actions/userAction';
import moment from 'moment';


const CutiList = ({ data, onPress }) => {
    return (
            <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={textStyles.textBold15}>{data.users_id} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({moment(data.tanggal_awal).format("dddd, DD MMMM YYYY")})</Text></Text>
            <View style={styles.viewData}>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>({moment(data.tanggal_akhir).format("dddd, DD MMMM YYYY")})</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.jumlah_hari}</Text>
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.status}</Text>
                </View>
            </View>
        </TouchableOpacity>   
    )
}

export default function ListData() {
    const { isLoading, cutiData, dataProfile } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [users_id, setUserId] = useState('');
    const [tanggal_awal, setTanggalAwal] = useState(null);
    const [tanggal_akhir, setTanggalAkhir] = useState(null);
    const [jumlah_hari, setJumlahHari] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isTanggalAwalValid, setIsTanggalAwalValid] = useState(true);
    const [isTanggalAkhirValid, setIsTanggalAkhirValid] = useState(true);
    const [isDeskripsiValid, setIsDeskripsiValid] = useState(true);

    
    useEffect(() => {
        dispatch(fetchCuti({idUser: dataProfile.id}));
    }, []);

    const onPressPostCuti = () => {
        validateInputs();
        if (!isInputValid()) {
            // Show a message indicating that some fields are empty
            Alert.alert('Error', 'Please fill in all the required fields.');
            return;
        }
        dispatch(postCuti({ 
            users_id : users_id, 
            tanggal_awal : moment(tanggal_awal).format("YYYY-MM-DD"), 
            tanggal_akhir : moment(tanggal_akhir).format("YYYY-MM-DD"), 
            deskripsi : deskripsi }))
            .then((response) => {
                setIsModalVisible1(false);
                if (response && response.error == false) {
                  // Show a success message using Alert
                  Alert.alert('Error', 'Failed to post data.');
                } else {
                  // Show an error message using Alert
                  Alert.alert('Success', 'Data has been posted successfully!');
                  setTanggalAwal(null);
                  setTanggalAkhir(null);
                  setDeskripsi('');
                }
              })
              .catch((error) => {
                setIsModalVisible1(true);
                // Show an error message using Alert
                Alert.alert('Error', 'An error occurred while posting data.');
              });
    };

    const isInputValid = () => {
        if (
          users_id.trim() === '' ||
          tanggal_awal === null ||
          tanggal_akhir === null ||
          deskripsi.trim() === '' 
        ) {
          return false;
        }
        return true;
    };

    const validateInputs = () => {
        setIsTanggalAwalValid(tanggal_awal !== null);
        setIsTanggalAkhirValid(tanggal_akhir !== null);
        setIsDeskripsiValid(deskripsi !== '');
      };

    const _onPressList = (data) => {
        setUserId(dataProfile.id.toString())
        setTanggalAwal(data.tanggal_awal);
        setTanggalAkhir(data.tanggal_akhir);
        setJumlahHari(data.jumlah_hari);
        setDeskripsi(data.deskripsi);
        setIsModalVisible2(true);
    }

    const handleOpenModal = () => {
        setIsModalVisible1(true);
        setUserId(dataProfile.id.toString())
      };


    return (
        <ContainerView>
            <ModalLoader isLoading={isLoading}/>
                <ButtonText
                    style={styles.buttonText} 
                    Color1={GlobalColors.RASTEKBIRU}
                    Color2={GlobalColors.RASTEKUNGU}
                    onPress={handleOpenModal}
                >
                Ajukan Cuti
                </ButtonText>
                <ModalForm
                isVisible={isModalVisible2}
                onCloseModal={() => setIsModalVisible2(false)}
                modalTitle={"Detail Cuti"}
                textButton={"CLOSE"}
                onPressSubmit={() => setIsModalVisible2(false)}
            >
                <Text style={{...textStyles.textBold13,}}>User ID : {users_id}</Text>
                <Text style={{...textStyles.textBold13,}}>Tanggal Awal : {tanggal_awal}</Text>
                <Text style={{...textStyles.textBold13,}}>Tanggal Akhir : {tanggal_akhir}</Text>
                <Text style={{...textStyles.textBold13,}}>Jumlah Hari : {jumlah_hari}</Text>
                <Text style={{...textStyles.textBold13,}}>Status : {deskripsi}</Text>
                </ModalForm>
                <ModalForm 
                isVisible={isModalVisible1} 
                onCloseModal={() => setIsModalVisible1(false)}
                modalTitle={"Pengajuan Cuti"}
                onPressSubmit={onPressPostCuti}
                >
                <InputText 
                    fullBorder
                    title='ID USER'
                    textInputConfig={{
                        placeholder: 'Enter your user name',
                        value: users_id,
                        editable: false,
                        onChangeText: (val) => setUserId(val), 
                    }}
                />
                <InputDate
                    title='TANGGAL AWAL'
                    onDateChange={(date) => {
                        setTanggalAwal(date)
                        // setEndDate(null)
                    }}
                    value={tanggal_awal}
                    style={! isTanggalAwalValid? { borderColor: 'red' } : null}
                />
                {!isTanggalAwalValid && <Text style={{ color: 'red' }}>TANGGAL AWAL cannot be empty.</Text>}
                <InputDate
                    title='TANGGAL AKHIR'
                    onDateChange={(date) => {
                        setTanggalAkhir(date)
                        // setEndDate(null)
                    }}
                    value={tanggal_akhir}
                    style={! isTanggalAkhirValid? { borderColor: 'red' } : null}
                />
                {!isTanggalAkhirValid && <Text style={{ color: 'red' }}>TANGGAL AKHIR cannot be empty.</Text>}
                <InputText 
                    fullBorder
                    title='DESKRIPSI'
                    textInputConfig={{
                        placeholder: 'Masukkan deskripsi',
                        onChangeText: (val) => setDeskripsi(val), 
                        style: !isDeskripsiValid ? { borderColor: 'red' } : null,
                    }}
                />
                {!isDeskripsiValid && <Text style={{ color: 'red' }}>DESKRIPSI cannot be empty.</Text>}
            </ModalForm>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
                {cutiData.map((data, index) => {
                    return <CutiList key={'pp' + index} data={data} onPress={() => _onPressList(data)} />
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