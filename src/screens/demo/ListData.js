import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView, ModalForm, ModalLoader, FilterComponent } from '../../components';
import { dataFilm } from '../../constants/Api';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogAbsen } from '../../redux/actions/userAction';
import { initialState } from '../../redux/reducers/userSlice';
import moment from 'moment';


const LogAbsenList = ({ data, onPress }) => {

    

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.label}>Tanggal</Text>
            <Text style={styles.label}>Jam Masuk</Text>
            <Text style={styles.label}>Jam Keluar</Text>
        </View>
        <View style={styles.dataContainer}>
            <Text style={styles.data}>: {data.users_id}</Text>
            <Text style={styles.data}>: {moment(data.tanggal).format("dddd, DD MMMM YYYY")}</Text>
            <Text style={styles.data}>: {data.jam_masuk}</Text>
            <Text style={styles.data}>: {data.jam_keluar}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}

export default function ListData() {
    const { isLoading, logAbsenData, dataProfile } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [filteredMonth, setFilteredMonth] = useState('');
    const [filteredYear, setFilteredYear] = useState('');

    const handleFilterChange = (month, year) => {
      setFilteredMonth(month);
      setFilteredYear(year);
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

      const groupedData = groupDataByMonth(logAbsenData);

      const FilterData = (data) => {
        const filteredData = {};
        data.forEach((item) => {
          const month = moment(item.tanggal).format('MMMM YYYY');
          if (!filteredData[month]) {
            filteredData[month] = [];
          }
          if (month === filteredMonth) {  
            filteredData[month].push(item);
          }
        });
        return filteredData;
      };

      const filteredData = FilterData(logAbsenData);

    const [users_id, setUserId] = useState('');
    const [tanggal, setTanggal] = useState(null);
    const [jam_masuk, setJamMasuk] = useState('');
    const [jam_keluar, setJamKeluar] = useState('');
    const [total_jam, setTotalJam] = useState('');
    const [keterlambatan, setKeterlambatan] = useState(null);
    
    useEffect(() => {
        dispatch(fetchLogAbsen({idUser: dataProfile.id}));
    }, []);

    const _onPressList = (data) => {
        
        setUserId(dataProfile.id.toString())
        setTanggal(data.tanggal);
        setJamMasuk(data.jam_masuk);
        setJamKeluar(data.jam_keluar);
        setTotalJam(data.total_jam);
        setKeterlambatan(data.keterlambatan);
        setIsModalVisible2(true);
    }

    const handleOpenModal = () => {
        setIsModalVisible2(true); //form input
        setUserId(dataProfile.id.toString())
      };

    return (
        <View style={{backgroundColor:'#EAEAEA', paddingBottom: 20}}>
            <ModalLoader isLoading={isLoading}/>
            <View style={{alignItems: 'center', paddingTop:10}}>
                <Text style={{color:'black', fontWeight:'900', fontSize:20}}>LOG ABSEN</Text>
            </View>
            <FilterComponent onFilterChange={handleFilterChange} />
            <ModalForm
                isVisible={isModalVisible2}
                onCloseModal={() => setIsModalVisible2(false)}
                modalTitle={"Detail Absen"}
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
                    <Text style={styles.label}>Jam Masuk:</Text>
                    <Text style={styles.detail}>{jam_masuk}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Jam Keluar:</Text>
                    <Text style={styles.detail}>{jam_keluar}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Total Jam:</Text>
                    <Text style={styles.detail}>{total_jam}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Status Kerja:</Text>
                    <Text style={styles.detail}>{keterlambatan === 0 ? 'Jam Kerja Terpenuhi' : keterlambatan === 1 ? 'Jam Kerja Tidak Terpenuhi': ''}</Text>
                </View>
            </View>
            </ModalForm>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
            {Object.keys(groupedData).map((month) => (
              <View key={month}>
                {!filteredMonth && (
                  <Text style={styles.monthTitle}>{month}</Text>
                )}
                {!filteredMonth ? (
                  groupedData[month].map((data, index) => (
                    <LogAbsenList key={`list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
                  ))
                ) : filteredData[month] && filteredData[month].length > 0 ? (
                  filteredData[month].map((data, index) => (
                    <LogAbsenList key={`filtered_list_${month}_${index}`} data={data} onPress={() => _onPressList(data)} />
                  ))
                ) : (
                  <Text style={styles.noDataText}>Data not available</Text>
                )}
              </View>
            ))}
          </ScrollView>
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