import { View, StyleSheet, StatusBar, ScrollView, Text, Image } from 'react-native';
import React, { useEffect, useState, useMemo} from 'react';
import { ButtonText, Carousel, ContainerView, ModalLoader, ProfileImage } from '../components';
import ButtonImage from '../components/ButtonImage';
import { dataCarousel } from '../constants/Api';
//Navigation
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ROUTES, StackNavigator } from '../navigations';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogout, fetchLogAbsen, fetchCuti,fetchLembur,fetchLibur } from '../redux/actions/userAction';
import { GlobalWidths, GlobalHeights, GlobalColors } from '../constants/Styles';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { TouchableOpacity } from 'react-native-gesture-handler';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { color } from 'react-native-reanimated';
import { initialState, resetMsgApiUser } from '../redux/reducers/userSlice';
import moment from 'moment';
import textStyles from '../constants/TextStyles';



import { GlobalImages } from '../constants/Images';
import Routes from '../navigations/Routes';

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        // Dispatch the logout action
        dispatch(fetchLogout());
        // if(msgApi == "Logout") {
        //     navigation.navigate(ROUTES.LOGIN);
        // }
    };

    
    const { dataProfile, logAbsenData,cutiData,lemburData,liburNasional, msgApi } = useSelector(state => state.user)

    const lastIndex = logAbsenData.length - 1;
    const lastAbsenData = lastIndex >= 0 ? logAbsenData[lastIndex] : null;
    
    const lastIndexCuti = cutiData.length - 1;
    const lastCutiData = lastIndexCuti >= 0 ? cutiData[lastIndexCuti] : null;

    const lastIndexLembur = lemburData.length - 1;
    const lastLemburData = lastIndexLembur >= 0 ? lemburData[lastIndexLembur] : null;

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
    const [shadowRadius, setShadowRadius] = useState(0);
    const [shadowOpacity, setShadowOpacity] = useState(0.1);

    useEffect(()=>{
        dispatch(fetchLogAbsen({idUser:dataProfile.id})),
        dispatch(fetchCuti({idUser: dataProfile.id})),
        dispatch(fetchLembur({idUser: dataProfile.id})),
        dispatch(fetchLibur())
    },[]);

    useEffect(()=>{
      if(msgApi==='Logout'){
        dispatch(resetMsgApiUser())
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: Routes.LOGIN}]
          })
        )
      }
    },[msgApi])
    // console.log(1)
    // console.log(lastCutiData)

    let statusText = '';

    if(lastAbsenData !== null){
      tanggal = lastAbsenData['tanggal'];
      jamMasuk = lastAbsenData['jam_masuk'];
      jamKeluar = lastAbsenData['jam_keluar'];
      if (lastAbsenData['keterlambatan'] === 0) {
        statusText = 'Terpenuhi';
      } else if (lastAbsenData['keterlambatan'] === 1) {
        statusText = 'Tidak Terpenuhi';
      }
    }else{
      tanggal = '';
      jamMasuk = '';
      jamKeluar = '';
      statusText = '';
    }

    if(lastCutiData !== null){
      deskripsiCuti = lastCutiData['deskripsi'];
      jumlahHariCuti = lastCutiData['jumlah_hari'];
      tanggalAkhirCuti = lastCutiData['tanggal_akhir'];
      tanggalAwalCuti = lastCutiData['tanggal_awal'];
      if (lastCutiData['status'] === null){
        statusCuti = 'Belum di proses';
      }else{
        if (lastCutiData['status'] === 0){
          statusCuti = 'Ditolak';
        }else{
          statusCuti = 'Diterima';
        }
      }
    }else{
      deskripsiCuti = '';
      jumlahHariCuti = '';
      tanggalAkhirCuti = '';
      tanggalAwalCuti = '';
      statusCuti = '';
    }

    if (lastLemburData !== null){
      tanggalLembur = lastLemburData['tanggal'];
      jamAwalLembur = lastLemburData['jam_awal'];
      jamAkhirLembur = lastLemburData['jam_akhir'];
      if (lastLemburData['status_kerja'] === 1) {
        statusKerjaLembur = 'Di Kantor';
      }else if (lastLemburData['status_kerja'] === 2) {
        statusKerjaLembur = 'Di Rumah';
      }

      if (lastLemburData['status'] === null){
        statusLembur = 'Belum di proses';
      }else{
        if (lastLemburData['status'] === 0){
          statusLembur = 'Ditolak';
        }else{
          statusLembur = 'Diterima';
        }
      }

    }else{
      tanggalLembur = '';
      jamAwalLembur = '';
      jamAkhirLembur = '';
      statusKerjaLembur = '';
      statusLembur = '';
    }

    // console.log(liburNasional)
    const nextNationalHoliday = useMemo(() => {
      const currentDate = new Date();
      const currentDateFormatted = moment(currentDate).format('YYYY-MM-DD');
      console.log(currentDateFormatted);

      const upcomingHolidays = liburNasional.filter(holiday => holiday['tanggal'] > currentDateFormatted);

      if (upcomingHolidays.length > 0) {
          return upcomingHolidays[0]; 
      }

      return null; 
    }, []);

    if (nextNationalHoliday !== null){
      deskripsiLibur = nextNationalHoliday['deskripsi'];
      tanggalLibur = nextNationalHoliday['tanggal'];
    }else{
      deskripsiLibur = '';
      tanggalLibur = '';
    }

    // console.log(1);
    // console.log(nextNationalHoliday);
    // console.log(2);

    return (
        <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />

  <View style={[styles.containerContent, { paddingTop: 10, flex: 1 }]}>
    <View style={{ justifyContent: 'flex-end' }}>
      <Text style={[styles.styleText]}>Welcome, {dataProfile.name}</Text>
      <ButtonImage
        children={GlobalImages.IMG_ACCOUNTDEFAULT}
        Color1='#EAEAEA'
        Color2='#EAEAEA'
        isRounded
        styleButton={[styles.boxSize, { height: 50, width: 50, position: 'absolute', top: 10, right: 20 }]}
        imageSize={{ height: 50, width: 50 }}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
      >
      </ButtonImage>
    </View>
    <View style={{ marginTop: 10 }}>
      <Text style={[styles.styleText, { fontSize: 18, color: '#324F5E', fontWeight: '600' }]}>Data Terbaru</Text>
      {/* <ScrollView contentContainerStyle={{ paddingTop: 10 }} showsVerticalScrollIndicator={false}>
        <Carousel data={dataCarousel} autoPlay={false} />
      </ScrollView> */}
      
    </View>
    <ScrollView
      horizontal={true}
      style={[styles.container]}
      contentContainerStyle={styles.contentContainer}
      snapToAlignment="center"
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      showsVerticalScrollIndicator={false}   // Hide vertical scroll indicator
      bounces={false}
    >
      <LinearGradient colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]} style={styles.item}>
        <View>
          <View style={{flexDirection:'row', paddingTop:14, paddingLeft:14}}>
            <Text style={{fontWeight:'800', fontSize:18, color:'white'}}>Kehadiran</Text>
            <Text style={{marginLeft:90, fontSize:14, color:'white'}}>{tanggal}</Text>
          </View>
          <View style={{flexDirection:'row', paddingTop:10, paddingLeft:42}}>
            <View>
              <Text style={{paddingBottom:10, fontSize:14, color:'white'}}>Jam Masuk</Text>
              <Text style={{paddingBottom:10, fontSize:14, color:'white'}}>Jam Keluar</Text>
              <Text style={{ fontSize:14, color:'white'}}>Status</Text>
            </View>
            <View style={{marginLeft:42}}>
              <Text style={{paddingBottom:10, fontSize:14, color:'white'}}>: {jamMasuk}</Text>
              <Text style={{paddingBottom:10, fontSize:14, color:'white'}}>: {jamKeluar}</Text>
              <Text style={{ fontSize:14, color:'white'}}>: {statusText}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]} style={styles.item}>
      <View>
          <View style={{flexDirection:'row', paddingTop:14, paddingLeft:14}}>
            <Text style={{fontWeight:'800', fontSize:18, color:'white'}}>Cuti</Text>
          </View>
          <View style={{flexDirection:'row', paddingLeft:42}}>
            <View>
              <Text style={{fontSize:14, color:'white'}}>Tanggal Awal</Text>
              <Text style={{fontSize:14, color:'white'}}>Tanggal Akhir</Text>
              <Text style={{fontSize:14, color:'white'}}>Jumlah Hari</Text>
              <Text style={{fontSize:14, color:'white'}}>Deskripsi</Text>
              <Text style={{fontSize:14, color:'white'}}>Status</Text>
            </View>
            <View style={{marginLeft:42}}>
              <Text style={{fontSize:14, color:'white'}}>: {tanggalAwalCuti}</Text>
              <Text style={{fontSize:14, color:'white'}}>: {tanggalAkhirCuti}</Text>
              <Text style={{fontSize:14, color:'white'}}>: {jumlahHariCuti}</Text>
              <Text style={{fontSize:14, color:'white'}}>: {deskripsiCuti}</Text>
              <Text style={{fontSize:14, color:'white'}}>: {statusCuti}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]} style={styles.item}>
      <View>
          <View style={{flexDirection:'row', paddingTop:14, paddingLeft:14}}>
            <Text style={{fontWeight:'800', fontSize:18, color:'white'}}>Lembur</Text>
            <Text style={{marginLeft:90, fontSize:14, color:'white'}}>{tanggalLembur}</Text>
          </View>
          <View style={{flexDirection:'row', paddingTop:10, paddingLeft:42}}>
            <View>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>Jam Awal</Text>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>Jam Akhir</Text>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>Status Kerja</Text>
              <Text style={{ fontSize:14, color:'white'}}>Status</Text>
            </View>
            <View style={{marginLeft:42}}>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>: {jamAwalLembur}</Text>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>: {jamAkhirLembur}</Text>
              <Text style={{paddingBottom:5, fontSize:14, color:'white'}}>: {statusKerjaLembur}</Text>
              <Text style={{ fontSize:14, color:'white'}}>: {statusLembur}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]} style={styles.item}>
      <View>
          <View style={{flexDirection:'row', paddingTop:14, paddingLeft:14}}>
            <Text style={{fontWeight:'800', fontSize:18, color:'white'}}>Libur Nasional</Text>
          </View>
          <View style={{flexDirection:'row', paddingLeft:42, paddingTop:10}}>
            <View>
              <Text style={{fontSize:14, color:'white', paddingBottom:10}}>Deskripsi</Text>
              <Text style={{fontSize:14, color:'white'}}>Tanggal</Text>
            </View>
            <View style={{marginLeft:20}}>
            <Text style={{ fontSize: 14, color: 'white', paddingBottom:10 }}>: {deskripsiLibur.length > 20 ? `${deskripsiLibur.substr(0, 20)}...` : deskripsiLibur}
            </Text>
              <Text style={{fontSize:14, color:'white'}}>: {tanggalLibur}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      {/* Add more items here */}
    </ScrollView>
    
      
    
    
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <View style={styles.boxBawah}>
        <Text style={{fontSize:18, fontWeight:'700', color:'#324F5E', paddingTop:20}}>Menu</Text>

        <View style={[styles.gridContainer,{paddingTop:20}]}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>
                <LinearGradient style={{width:320, height:70, borderRadius:GlobalWidths[2], alignItems: 'center', justifyContent: 'center'}} colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
                Text onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>
                    <Image source={GlobalImages.IMGABSEN} style={{width:60, height:60, position:'absolute', left:10}}/>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }} onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>KEHADIRAN</Text>

                </LinearGradient>

            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate(ROUTES.LEMBUR)}>
                <LinearGradient style={{width:320, height:70, borderRadius:GlobalWidths[2], alignItems: 'center', justifyContent: 'center'}} colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
                Text onPress={() => navigation.navigate(ROUTES.LEMBUR)}>
                    <Image source={GlobalImages.IMGLEMBUR} style={{width:60, height:60, position:'absolute', left:10}}/>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }} onPress={() => navigation.navigate(ROUTES.LEMBUR)}>LEMBUR</Text>
                </LinearGradient>

            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate(ROUTES.CUTI)}>
                <LinearGradient style={{width:320, height:70, borderRadius:GlobalWidths[2], alignItems: 'center', justifyContent: 'center'}} colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
                Text onPress={() => navigation.navigate(ROUTES.CUTI)}>
                    <Image source={GlobalImages.IMGCUTI} style={{width:60, height:60, position:'absolute', left:10}}/>

                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }} onPress={() => navigation.navigate(ROUTES.CUTI)}>CUTI</Text>
                </LinearGradient>

            </TouchableOpacity>

            
        </View>
        <TouchableOpacity style={{marginTop:40}} onPress={handleLogout}>
                <LinearGradient style={{width:100, height:40, borderRadius:GlobalWidths[2], alignItems: 'center', justifyContent: 'center'}} colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]}
                Text onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>
                    <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }} onPress={handleLogout}>LOG OUT</Text>
                </LinearGradient>

        </TouchableOpacity>
      </View>

      
    </View>
  </View>
  
</View>
    )
}

const styles = StyleSheet.create({
    styleText: {
        fontSize:20,
        color:'black',
        fontWeight:'900',
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#F8F9F9S'
    },
    boxBawah: {
        width:GlobalWidths[100],
        height:GlobalHeights[55],
        backgroundColor:'#f8f9f9',
        borderTopLeftRadius:GlobalWidths[10],
        borderTopRightRadius:GlobalWidths[10],
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width:0,
            height:6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    overlay: {
        width: GlobalWidths[80],
        height: GlobalHeights[25],
        borderRadius:GlobalWidths[10],
        backgroundColor: 'rgba(255, 255, 255, 1)', // Warna semitransparan untuk efek overlay
        position: 'absolute', // Menggunakan position: 'absolute' untuk mengatur posisi di atas
        bottom:0,
        marginBottom: GlobalHeights[55],
        alignItems: 'center',
        shadowColor: 'black',
        
      },
    containerContent: {
        // flex:1,
        width: GlobalWidths[100],
        height: GlobalHeights[100],
    },
    TextSyle: {
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    box: {
        width: GlobalWidths[100] ,
        height: GlobalHeights[60],
        borderTopRightRadius: GlobalWidths[10],
        borderTopLeftRadius: GlobalWidths[10],
        // justifyContent: 'center',
        // alignItems: 'center',
        bottom:0,
        position: 'absolute',
        shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5, // Ubah nilai ini sesuai dengan kebutuhan
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
      },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Atur posisi horizontal tombol di tengah
        alignItems: 'center', // Atur posisi vertikal tombol di tengah
        // padding: 10, // Jarak antara tombol
      },
    boxSize: {
        alignItems: 'center',
        width:GlobalHeights[15],
        height: GlobalHeights[15],
    },
    
      icon: {
        width:GlobalHeights[10],
        height: GlobalHeights[10],
        
        // resizeMode: 'contain', // You can adjust the image's resize mode
      },
      containerCarousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },

      container: {
        flex: 1,
        flexDirection: 'row', // This is important for horizontal scrolling
        marginBottom : GlobalHeights[30]
      },
      item: {
        width: GlobalWidths[80],
        height: GlobalHeights[20],
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'black',
        marginRight: 10,
        borderRadius:10
      },
      
      contentContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
})