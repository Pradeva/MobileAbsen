import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalForm, ModalLoader, InputText, ButtonText, InputDate, FilterComponent } from '../../components';
import { GlobalColors, GlobalFontSizes, GlobalHeights, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCuti, postCuti } from '../../redux/actions/userAction';
import moment from 'moment';


const CutiList = ({ data, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.label}>Tanggal Awal</Text>
            <Text style={styles.label}>Tanggal Akhir</Text>
            <Text style={styles.label}>Jumlah Hari</Text>
            <Text style={styles.label}>Deskripsi</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>: {data.users_id}</Text>
            <Text style={styles.data}>: {moment(data.tanggal_awal).format("dddd, DD MMMM YYYY")}</Text>
            <Text style={styles.data}>: {moment(data.tanggal_akhir).format("dddd, DD MMMM YYYY")}</Text>
            <Text style={styles.data}>: {data.jumlah_hari}</Text>
            <Text style={styles.data}>: {data.deskripsi}</Text>
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
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isTanggalAwalValid, setIsTanggalAwalValid] = useState(true);
    const [isTanggalAkhirValid, setIsTanggalAkhirValid] = useState(true);
    const [isDeskripsiValid, setIsDeskripsiValid] = useState(true);
    const [filteredMonth, setFilteredMonth] = useState('');
    const [filteredYear, setFilteredYear] = useState('');
    
    
    const handleFilterChange = (month, year) => {
      setFilteredMonth(month);
      setFilteredYear(year);
    };

    const groupDataByMonth = (data) => {
        const groupedData = {};
        data.forEach((item) => {
          const month = moment(item.tanggal_awal).format('MMMM YYYY');
          if (!groupedData[month]) {
            groupedData[month] = [];
          }
          groupedData[month].push(item);
        });
        return groupedData;
      };

      const groupedData = groupDataByMonth(cutiData);

      const FilterData = (data) => {
        const filteredData = {};
        data.forEach((item) => {
          const month = moment(item.tanggal_awal).format('MMMM YYYY');
          if (!filteredData[month]) {
            filteredData[month] = [];
          }
          if (month === filteredMonth) {  
            filteredData[month].push(item);
          }
        });
        return filteredData;
      };

      const filteredData = FilterData(cutiData);

    
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
        setStatus(data.status);
        setIsModalVisible2(true);
    }

    const handleOpenModal = () => {
        setIsModalVisible1(true);
        setUserId(dataProfile.id.toString())
      };


    return (
        <View style={{backgroundColor:'#EAEAEA', paddingBottom: 20, height: GlobalHeights[100]}}>
            <ModalLoader isLoading={isLoading}/>
            <View style={{alignItems: 'center', paddingTop:10}}>
                <Text style={{color:'black', fontWeight:'900', fontSize:20}}>CUTI</Text>
                
            </View>
            <FilterComponent onFilterChange={handleFilterChange} />
            <ModalForm
                isVisible={isModalVisible2}
                onCloseModal={() => setIsModalVisible2(false)}
                modalTitle={"Detail Cuti"}
                textButton={"CLOSE"}
                onPressSubmit={() => setIsModalVisible2(false)}
            >
                <View style={styles.modalContent}>
                <View style={styles.section}>
                    <Text style={styles.label}>User ID :</Text>
                    <Text style={styles.detail}>{users_id}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Tanggal Awal :</Text>
                    <Text style={styles.detail}>{tanggal_awal}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Tanggal Akhir :</Text>
                    <Text style={styles.detail}>{tanggal_akhir}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Jumlah Hari :</Text>
                    <Text style={styles.detail}>{jumlah_hari}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Deskripsi :</Text>
                    <Text style={styles.detail}>{deskripsi}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.detail}>{status === 1 ? 'DISETUJUI' : status === 2 ? 'DITOLAK' : 'belum di approve'}</Text>
                </View>
            </View>

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
                    fullBorder
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
                    fullBorder
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
                        // style: !isDeskripsiValid ? { borderColor: 'red' } : null,
                    }}
                />
                {!isDeskripsiValid && <Text style={{ color: 'red' }}>DESKRIPSI cannot be empty.</Text>}
            </ModalForm>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
            {Object.keys(groupedData).map((month) => (
              <View key={month}>
                {!filteredMonth && (
                  <Text style={styles.monthTitle}>{month}</Text>
                )}
                {!filteredMonth ? (
                  groupedData[month].map((data, index) => (
                    <CutiList key={`list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
                  ))
                ) : filteredData[month] && filteredData[month].length > 0 ? (
                  filteredData[month].map((data, index) => (
                    <CutiList key={`filtered_list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
                  ))
                ) : (
                  <Text style={styles.noDataText}>Data not available</Text>
                )}
              </View>
            ))}
          </ScrollView>
        <View style={styles.buttonContainer}>
            <ButtonText
                    style={styles.buttonText} 
                    Color1={GlobalColors.RASTEKBIRU}
                    Color2={GlobalColors.RASTEKUNGU}
                    onPress={handleOpenModal}
                >
                Ajukan Cuti
                </ButtonText>
                </View>
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
    
const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalColors.LIGHT,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4
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
        fontSize: 12,
        color: '#333333',
        marginBottom: 7,
      },
      data: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#666666',
        marginBottom: 7,
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