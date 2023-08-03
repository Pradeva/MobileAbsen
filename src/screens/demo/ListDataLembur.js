import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalLoader, ModalForm, ButtonText, InputText, InputDate, DropDown, RadioButton} from '../../components';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLembur, postLembur } from '../../redux/actions/userAction';
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
    const [users_id, setUserId] = useState('');
    const [jam_awal, setJamAwal] = useState('');
    const [jam_akhir, setJamAkhir] = useState('');
    const [jumlah_jam, setJumlahJam] = useState('');
    const [status_kerja, setStatusKerja] = useState('');
    const [status, setStatus] = useState('');
    const [tanggal, setTanggal] = useState(null);

    const [isIdUserValid, setIsIdUserValid] = useState(true);
    const [isTanggalValid, setIsTanggalValid] = useState(true);
    const [isJamAwalValid, setIsJamAwalValid] = useState(true);
    const [isJamAkhirValid, setIsJamAkhirValid] = useState(true);
    const [isStatusKerjaValid, setIsStatusKerjaValid] = useState(true);

    const groupDataByMonth = (data) => {
        const groupedData = {};
        data.forEach((item) => {
          const month = moment(item.tanggal).format('MMMM YYYY');
          if (!groupedData[month]) {
            groupedData[month] = [];
          }
          groupedData[month].push(item);
        });
        return groupedData;
      };

    useEffect(() => {
        dispatch(fetchLembur({idUser: dataProfile.id}));
    }, []);

    const onPressPostLembur = () => {

        validateInputs();
        if (!isInputValid()) {
            // Show a message indicating that some fields are empty
            Alert.alert('Error', 'Please fill in all the required fields.');
            return;
        }
          dispatch(
            postLembur({ 
              users_id: users_id, 
              tanggal: moment(tanggal).format("YYYY-MM-DD"),
              jam_awal: jam_awal,
              jam_akhir: jam_akhir,  
              status_kerja: status_kerja
            })
          )
          .then((response) => {
            setIsModalVisible1(false);
            if (response.error === false) {
              // Show a success message using Alert
              Alert.alert('Error', 'Failed to post data.');
            } else {
              // Show an error message using Alert
              Alert.alert('Success', 'Data has been posted successfully!');
              setUserId('');
              setTanggal(null);
              setJamAwal('');
              setJamAkhir('');
              setJumlahJam('');
              setStatusKerja('');
              setStatus('');
            }
          })
          .catch((error) => {
            setIsModalVisible1(true);
            // Show an error message using Alert
            Alert.alert('Error', 'An error occurred while posting data.');
          });
    };

    const validateInputs = () => {
        setIsIdUserValid(users_id !== '');
        setIsTanggalValid(tanggal !== null);
        setIsJamAwalValid(jam_awal !== '');
        setIsJamAkhirValid(jam_akhir !== '');
        setIsStatusKerjaValid(status_kerja !== '');
      };

    const _onPressList = (data) => {
        setUserId(dataProfile.id.toString())
        setTanggal(data.tanggal);
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

      const isInputValid = () => {
        if (
          users_id.trim() === '' ||
          tanggal === null ||
          jam_awal.trim() === '' ||
          jam_akhir.trim() === '' ||
          status_kerja === ''
        ) {
          return false;
        }
        return true;
    };

    const groupedData = groupDataByMonth(lemburData);


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
                onPressSubmit={() => setIsModalVisible2(false)}
            >
                <View style={styles.modalContent}>
                <View style={styles.section}>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.detail}>{users_id}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Tanggal:</Text>
                    <Text style={styles.detail}>{tanggal}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Jam Awal:</Text>
                    <Text style={styles.detail}>{jam_awal}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Jam Akhir:</Text>
                    <Text style={styles.detail}>{jam_akhir}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Jumlah Jam:</Text>
                    <Text style={styles.detail}>{jumlah_jam}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status Kerja:</Text>
                    <Text style={styles.detail}>{status_kerja === 1 ? 'Di Rumah' : status_kerja === 2 ? 'Di Kantor' : status_kerja}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.detail}>{status}</Text>
                </View>
            </View>
            </ModalForm>
            <ModalForm 
                isVisible={isModalVisible1} 
                onCloseModal={() => setIsModalVisible1(false)}
                modalTitle={"Pengajuan Lembur"}
                onPressSubmit={onPressPostLembur}
            >
                <InputText 
                    fullBorder
                    title='ID USER'
                    textInputConfig={{
                        placeholder: 'Enter your user name',
                        value: users_id,
                        editable: false,
                        onChangeText: (val) => setUserId(val),
                        style: !isIdUserValid ? { borderColor: 'red' } : null, 
                    }}
                />
                {!isIdUserValid && <Text style={{ color: 'red' }}>ID USER cannot be empty.</Text>}
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
                        setTanggal(date)
                        // setEndDate(null)
                    }}
                    value={tanggal}
                    style={!isTanggalValid ? { borderColor: 'red' } : null}
                />
                {!isTanggalValid && <Text style={{ color: 'red' }}>TANGGAL LEMBUR cannot be empty.</Text>}
                <InputText 
                    fullBorder
                    title='JAM AWAL'
                    textInputConfig={{
                        placeholder: 'Masukkan jam awal',
                        onChangeText: (val) => setJamAwal(val), 
                        style: !isJamAwalValid ? { borderColor: 'red' } : null,
                    }}
                />
                {!isJamAwalValid && <Text style={{ color: 'red' }}>JAM AWAL cannot be empty.</Text>}
                <InputText 
                    fullBorder
                    title='JAM AKHIR'
                    textInputConfig={{
                        placeholder: 'Masukkan jam akhir',
                        onChangeText: (val) => setJamAkhir(val),
                        style: !isJamAkhirValid ? { borderColor: 'red' } : null, 
                    }}
                />
                {!isJamAkhirValid && <Text style={{ color: 'red' }}>JAM AKHIR cannot be empty.</Text>}
                <RadioButton
                    title="PILIH LOKASI"
                    dataRadio={[
                        { label: 'Di Rumah', value: 1 },
                        { label: 'Di Kantor', value: 2 },
                    ]}
                    initialValue={status_kerja}
                    onPress={(value) => setStatusKerja(value)}
                    
                />
            </ModalForm>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
            {Object.keys(groupedData).map((month) => (
          <View key={month}>
            <Text style={styles.monthHeader}>{month}</Text>
            {groupedData[month].map((data, index) => (
              <LemburList key={`list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
            ))}
          </View>
        ))}
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
    },
    modalContent: {
        paddingHorizontal: kDefaultPadding,
        paddingTop: kDefaultPadding,
      },
      section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      label: {
        ...textStyles.textBold13,
        color: GlobalColors.DARK, // Customize the label color if needed
      },
      detail: {
        ...textStyles.text13,
        color: GlobalColors.INFO, // Customize the detail color if needed
      },
}) 