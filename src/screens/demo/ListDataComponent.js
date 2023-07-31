import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerView } from '../../components';
import { dataFilm } from '../../constants/Api';
import { GlobalColors, GlobalFontSizes, kDefaultPadding } from '../../constants/Styles';
import textStyles from '../../constants/TextStyles';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogAbsen } from '../../redux/actions/userAction';
import { initialState } from '../../redux/reducers/userSlice';



const LogAbsenList = ({ onPress }) => {
    const { isLoading, logAbsenData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(logAbsenData);
  
    useEffect(() => {
      dispatch(fetchLogAbsen());
    }, [dispatch]);

    const[jamMasuk, setJamMasuk] = useState('');

    useEffect(() => {
        if(logAbsenData) {
            setJamMasuk(logAbsenData.jam_masuk);
        }
    }, [logAbsenData]);
  
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
  
    return (
    <View style={{ padding: 20 }}>
        {isLoading ? <Text>Loading...</Text> :
        (
            <FlatList
                data={logAbsenData}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => <Text>{item.tanggal}  </Text>}
            />
        )}
    </View>
    );
  };
  
  export default LogAbsenList;

// const LogAbsenList = ({ data, onPress }) => {
//     const { isLoading, logAbsenData } = useSelector(state => state.user)
//     const dispatch = useDispatch();
    

  
//     useEffect(() => {
//       // Fetch log absen data for the logged-in user (replace 'userId' with the actual user ID)
//         // console.log(initialState.dataProfile);
//       dispatch(fetchLogAbsen());
//     }, [dispatch]);
    

//     if (isLoading) {
//         return <Text>Loading...</Text>;
//       }

//       return (
//         <TouchableOpacity style={styles.card} onPress={onPress}>
//             <Text style={textStyles.textBold15}>{data.id} <Text style={{ ...textStyles.textBold12, color: GlobalColors.DANGER }}>({data.Year})</Text></Text>
//             <View style={styles.viewData}>
//                 <Text style={{ ...textStyles.textMd12, color: GlobalColors.INFO }}>{data.jam_masuk}</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Icon name="star" size={GlobalFontSizes[24]} color={GlobalColors.WARNING} />
//                     <Text style={{...textStyles.textBold13, marginLeft: 5}}>{data.jam_keluar}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )

// }
//     export default function ListDataComponent() {
//         const _onPressList = (data) => {
//             console.warn(data.id + ' Has Selected')
//         }
    
//         return (
//             <ContainerView>
//                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: kDefaultPadding }}>
//                     {dataFilm.map((data, index) => {
//                         return <LogAbsenList key={'pp' + index} data={data} onPress={() => _onPressList(data)} />
//                     })}
//                 </ScrollView>
//             </ContainerView>
//         )
//     }
    
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