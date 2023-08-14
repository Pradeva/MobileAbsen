import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalLoader, ModalForm, ButtonText, InputText, InputDate, DropDown, RadioButton} from '../../components';
import { GlobalColors, GlobalFontSizes,GlobalHeights, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLembur, postLembur } from '../../redux/actions/userAction';
import { initialState } from '../../redux/reducers/userSlice';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigations';




const LemburList = ({ data, onPress }) => {
    const convertToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} jam ${remainingMinutes} menit`;
      };
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.label}>Tanggal</Text>
            <Text style={styles.label}>Jam Awal</Text>
            <Text style={styles.label}>Jam Akhir</Text>
            <Text style={styles.label}>Jumlah Jam</Text>
            <Text style={styles.label}>Status Kerja</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>: {data.users_id}</Text>
            <Text style={styles.data}>: {moment(data.tanggal).format("dddd, DD MMMM YYYY")}</Text>
            <Text style={styles.data}>: {data.jam_awal}</Text>
            <Text style={styles.data}>: {data.jam_akhir}</Text>
            <Text style={styles.data}>: {convertToHours(data.jumlah_jam)}</Text>
            <Text style={styles.data}>
              : {data.status_kerja === 2 ? 'Di Rumah' : data.status_kerja === 1 ? 'Di Kantor' : data.status_kerja}
            </Text>
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

    const convertToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} jam ${remainingMinutes} menit`;
      };

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
        <View style={{backgroundColor:'#EAEAEA', paddingBottom: 20, height: GlobalHeights[100]}}>
            <ModalLoader isLoading={isLoading}/>
            <View style={{alignItems: 'center', paddingTop:10}}>
                <Text style={{color:'black', fontWeight:'900', fontSize:20}}>LEMBUR</Text>
            </View>
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
                    <Text style={styles.detail}>{convertToHours(jumlah_jam)}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status Kerja:</Text>
                    <Text style={styles.detail}>{status_kerja === 2 ? 'Di Rumah' : status_kerja === 1 ? 'Di Kantor' : status_kerja}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.detail}>{status === 1 ? 'DISETUJUI' : status === 2 ? 'DITOLAK' : 'BELUM DI PROSES'}</Text>
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
                    }}
                />
                {!isIdUserValid && <Text style={{ color: 'red' }}>ID USER cannot be empty.</Text>}
                
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
                        { label: 'Di Rumah', value: 2 },
                        { label: 'Di Kantor', value: 1 },
                    ]}
                    initialValue={status_kerja}
                    onPress={(value) => setStatusKerja(value)}
                    
                />
            </ModalForm>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
            {Object.keys(groupedData).map((month) => (
          <View key={month}>
            <Text style={styles.monthTitle}>{month}</Text>
            {groupedData[month].map((data, index) => (
              <LemburList key={`list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
            ))}
          </View>
        ))}
            </ScrollView>
            <View style={styles.buttonContainer}>

            <ButtonText
                style={styles.buttonText} 
                Color1={GlobalColors.RASTEKBIRU}
                Color2={GlobalColors.RASTEKUNGU}
                onPress={()=>handleOpenModal()}
            >
                Pengajuan Lembur
            </ButtonText>
            </View>
        </View>
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
        color: GlobalColors.DARK, // Customize the detail color if needed
      },

      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      labelContainer: {
        flex: 1,
      },
      dataContainer: {
        flex: 1,
        paddingLeft: 5,
      },
      label: {
        fontFamily: 'Roboto-Bold',
        fontSize: 13,
        color: '#333333',
        marginBottom: 4,
      },
      data: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: '#666666',
        marginBottom: 4,
      },

      container: {
        flex: 1,
        backgroundColor: GlobalColors.LIGHT,
        paddingBottom: 20,
      },
      header: {
        alignItems: 'center',
        paddingTop: 10,
      },
      headerText: {
        color: 'black',
        fontWeight: '900',
        fontSize: 20,
      },
      contentContainer: {
        padding: kDefaultPadding,
      },
      monthTitle: {
        color: 'black',
        marginBottom: 5,
        fontWeight: '700',
        fontSize: GlobalFontSizes[16],
      },
      buttonContainer: {
        paddingTop: 10,
        alignItems: 'center',
      },
      buttonText: {
        fontSize: GlobalFontSizes[16],
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
}) 