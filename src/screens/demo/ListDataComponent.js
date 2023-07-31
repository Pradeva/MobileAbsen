import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView } from '../../components';
import { dataFilm } from '../../constants/Api';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogAbsen } from '../../redux/actions/userAction';
import { initialState } from '../../redux/reducers/userSlice';

const ItemList = ({ data, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={textStyles.textBold15}>
          {data.tanggal} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({data.jam_keluar})</Text>
        </Text>
        <View style={styles.viewData}>
          <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.jam_masuk}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
            <Text style={{ ...textStyles.textBold13, marginLeft: 5 }}>{data.deskripsi}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const LogAbsenList = ({ navigation }) => {
    const dispatch = useDispatch();
    const logAbsenData = useSelector((state) => state.user.logAbsen);
    
  
    // useEffect(() => {
    //   // Fetch log absen data for the logged-in user (replace 'userId' with the actual user ID)
    //     // console.log(initialState.dataProfile);
    //   dispatch(fetchLogAbsen());
    // }, [dispatch]);
  
    useEffect(() => {
        // Fetch log absen data for the logged-in user (replace 'userId' with the actual user ID)
        dispatch(fetchLogAbsen())
          .then((data) => {
            console.log('Data logAbsenData:', logAbsenData);
        })
          .catch((error) => {
            console.error(error); // Kesalahan dalam pengambilan data
          });
      }, [dispatch]);
      
    // console.log('Data logAbsenData:', logAbsenData);
    const handleLogAbsenItemPress = (data) => {
      // Navigate to the detail screen when an data is clicked and pass the 'jam_masuk' and 'jam_keluar' data
      navigation.navigate('LogAbsenDetail', { jamMasuk: data.jam_masuk, jamKeluar: data.jam_keluar });
    };

    // const renderItem = ({ data }) => (
    //     <TouchableOpacity onPress={() => handleLogAbsenItemPress(data)}>
    //       <View style={{ padding: 16 }}>
    //         <Text>{data.tanggal}</Text>
    //         {/* Add other log absen data to display */}
    //       </View>
    //     </TouchableOpacity>
    //   );
    // const renderItem = ({ item }) => (
    //     <ItemList
    //       data={{
    //         tanggal: item.tanggal, // Assuming 'tanggal' property contains the title
    //         jam_keluar: item.jam_keluar, // If needed, you can add 'Year' information here
    //         jam_masuk: item.jam_masuk, // If needed, you can add 'Genre' information here
    //         deskripsi: item.deskripsi, // If needed, you can add 'imdbRating' information here
    //       }}
    //       onPress={() => handleLogAbsenItemPress(item)}
    //     />
    //   );
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleLogAbsenItemPress(item)}>
          <View style={{ padding: 16 }}>
            <Text>{item.tanggal}</Text>
            {/* Add other log absen data to display */}
          </View>
        </TouchableOpacity>
      );
    //   console.log('Data logAbsenData:', logAbsenData);
      return (
        <ContainerView>
            <FlatList
                data={logAbsenData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </ContainerView>
      );
    };
    
    export default LogAbsenList;
// -----------------------------------------------------------------------------------------------


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