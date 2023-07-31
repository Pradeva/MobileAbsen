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

// const LogAbsenList = ({ navigation }) => {
//     const dispatch = useDispatch();
//     const logAbsenData = useSelector((state) => state.user.logAbsen);
    
  
//     useEffect(() => {
//       // Fetch log absen data for the logged-in user (replace 'userId' with the actual user ID)
//         // console.log(initialState.dataProfile);
//       dispatch(fetchLogAbsen);
//     }, []);
  
//     const handleLogAbsenItemPress = (item) => {
//       // Navigate to the detail screen when an item is clicked and pass the 'jam_masuk' and 'jam_keluar' data
//       navigation.navigate('LogAbsenDetail', { jamMasuk: item.jam_masuk, jamKeluar: item.jam_keluar });
//     };

//     console.log(1);
//     const renderItem = ({ item }) => (
//         <TouchableOpacity onPress={() => handleLogAbsenItemPress(item)}>
//           <View style={{ padding: 16 }}>
//             <Text>{item.tanggal}</Text>
//             {/* Add other log absen data to display */}
//           </View>
//         </TouchableOpacity>
//       );
    
//       return (
//         <FlatList
//           data={logAbsenData}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       );
//     };
    
//     export default LogAbsenList;

const ItemList = ({ data, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={textStyles.textBold15}>{data.Title} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({data.Year})</Text></Text>
            <View style={styles.viewData}>
                <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.Genre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
                    <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.imdbRating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default function ListDataComponent() {
    const _onPressList = (data) => {
        console.warn(data.Title + ' Has Selected')
    }

    return (
        <ContainerView>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
                {dataFilm.map((data, index) => {
                    return <ItemList key={'pp' + index} data={data} onPress={() => _onPressList(data)} />
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