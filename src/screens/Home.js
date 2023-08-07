import { View, StyleSheet, StatusBar, ScrollView, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { ButtonText, ContainerView, ModalLoader, ProfileImage } from '../components';
import ButtonImage from '../components/ButtonImage';
//Navigation
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../navigations';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogout } from '../redux/actions/userAction';
import { GlobalWidths, GlobalHeights, GlobalColors } from '../constants/Styles';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { TouchableOpacity } from 'react-native-gesture-handler';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { color } from 'react-native-reanimated';
import { initialState } from '../redux/reducers/userSlice';

import { GlobalImages } from '../constants/Images';

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        // Dispatch the logout action
        await dispatch(fetchLogout());
        
        // Navigate to the login page after logout
        navigation.navigate(ROUTES.LOGIN);
    };
    const { dataProfile, logAbsenData } = useSelector(state => state.user)
    console.log(dataProfile)

    const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
    const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
    const [shadowRadius, setShadowRadius] = useState(0);
    const [shadowOpacity, setShadowOpacity] = useState(0.1);
  

    return (
        <LinearGradient colors={['#EAEAEA', '#EAEAEA']} start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }} style={styles.containerContent}>
            <Text style={[styles.TextSyle, {marginTop:20}, {fontSize:14}, {color:'#35022D'} ]}>Welcome,</Text>
            <Text style={[styles.TextSyle, {fontSize:32},{color:'#35022D'} ]}>{dataProfile.name}</Text>
            <ButtonImage
                children={GlobalImages.IMG_ACCOUNTDEFAULT}
                onPress={() => navigation.navigate(ROUTES.PROFILE)}
            >
            </ButtonImage>
            



            {/* <LinearGradient  colors={['white', 'white']} style={styles.container}> */}
            
            {/* <LinearGradient colors={[GlobalColors.RASTEKBIRU, GlobalColors.RASTEKUNGU]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                style={[styles.box]}> */}
            <View style={[styles.box, {backgroundColor: '#1C305E'}]}>
                    <Text style={[styles.textStyle, {marginTop: '20%'},{marginLeft: 30}]}>Menu</Text>
                    <View style={[styles.gridContainer]}>
                        <View style={[styles.gridContainer, {flexDirection:'column'}]}>
                            <ButtonImage children={GlobalImages.IMGABSEN} 
                                Color1='#EAEAEA' 
                                Color2='#EAEAEA' 
                                styleButton={styles.boxSize} 
                                onPress={() => navigation.navigate(ROUTES.DEMOLISTVIEW)}>
                            </ButtonImage>
                            <Text style={[{color:'white'}, {fontWeight:'bold'}]}>Presensi</Text>
                        </View>
                        <View style={[styles.gridContainer, {flexDirection:'column'}]}>
                            {/* <ButtonText styleButton={styles.boxSize} onPress={() => navigation.navigate(ROUTES.CUTI)}>List View Data Cuti</ButtonText> */}
                            <ButtonImage children={GlobalImages.IMGCUTI} 
                                Color1='#EAEAEA' 
                                Color2='#EAEAEA' 
                                styleButton={styles.boxSize} 
                                onPress={() => navigation.navigate(ROUTES.CUTI)}>
                            </ButtonImage>
                            <Text style={[{color:'white'}, {fontWeight:'bold'}]}>Cuti</Text>

                        </View>
                    </View>
                    <View style={styles.gridContainer}>
                        <View style={[styles.gridContainer, {flexDirection:'column'}]}>
                        <ButtonImage children={GlobalImages.IMGLEMBUR} 
                                Color1='#EAEAEA' 
                                Color2='#EAEAEA' 
                                styleButton={styles.boxSize} 
                                onPress={() => navigation.navigate(ROUTES.LEMBUR)}>
                            </ButtonImage>                            
                            <Text style={[{color:'white'}, {fontWeight:'bold'}]}>Lembur</Text>

                        </View>
                        {/* <View style={[styles.gridContainer, {flexDirection:'column'}]}>

                        <ButtonText styleButton={styles.boxSize} onPress={handleLogout}>SIGN OUT</ButtonText>
                        </View> */}
                    </View>
            </View>
            {/* </LinearGradient> */}
            <View style={[styles.overlay, {shadowOffset: {
            width: shadowOffsetWidth,
            height: -shadowOffsetHeight,
          },
          shadowOpacity,
          shadowRadius,}]}>
                <View style={[{width: GlobalWidths[70]}, {height: GlobalHeights[15], flex: 1, justifyContent: 'center'}]}>
                    <Text style={[{color:'black', fontSize:14, fontWeight:'bold', alignSelf:'center', marginBottom:20}]}> DATA ABSEN TERAKHIR</Text>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom:10, paddingLeft:10}}>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold', width:100}]}> Tanggal</Text>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold'}]}> : {logAbsenData[0]?.tanggal}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom:10, paddingLeft:10}}>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold', width:100}]}> Jam Masuk</Text>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold'}]}> : {logAbsenData[0]?.jam_masuk}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft:10}}>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold', width:100}]}> Jam Keluar</Text>
                        <Text style={[{color:'black', fontSize:14, fontWeight:'bold'}]}> : {logAbsenData[0]?.jam_keluar}</Text>
                    </View>
                </View>
            </View>

            {/* </LinearGradient> */}
            <ButtonImage children={GlobalImages.IMGLOGOUT} 
                                Color1='#EAEAEA' 
                                Color2='#EAEAEA' 
                                styleButton={[styles.boxSize, {height:25, width:25, position: 'absolute',
                                top: 20,
                                right: 20,}]} 
                                imageSize={{height:25, width:25}}
                                onPress={handleLogout}>
                            </ButtonImage>      
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
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
        alignItems:'center',
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
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'flex-end', // Mengatur konten di bagian bawah container
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
})