import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalHeights, GlobalWidths } from '../constants/Styles';



export default function ProfileScreen() {
  const {dataProfile } = useSelector(state => state.user)
  
  
  return (
    <View style={{width:GlobalWidths[100], height:GlobalHeights[100], backgroundColor:'#EAEAEA', alignItems:'center'}}>
        <View style={{width:GlobalWidths[100], height:GlobalHeights[40], backgroundColor:'#1C305E', borderBottomStartRadius:GlobalWidths[20], borderBottomEndRadius:GlobalWidths[20]}}>
            <Text style={styles.name}>{dataProfile.name}</Text>

        </View>
        <Text style={{fontSize:25, paddingTop:20}}>INFORMASI KARYAWAN</Text>

        <View style={{flexDirection:'row'}}>
            <View>
                <Text>Sisa Cuti</Text>
                <Text>Jumlah Jam Lebih</Text>
                <Text>Jumlah Jam Kurang</Text>
            </View>
            <View>
                <Text>: {dataProfile.sisa_cuti}</Text>
                <Text>: {dataProfile.jam_lebih}</Text>
                <Text>: {dataProfile.jam_kurang}</Text>
            </View>
        </View>
      {/* <Text style={styles.role}>Jabatan : {dataProfile.role_id}</Text>
      <Text style={styles.role}>Sisa Cuti : {dataProfile.sisa_cuti}</Text>
      <Text style={styles.jumlahJamKerja}>Jumlah Jam Lebih: {dataProfile.jam_lebih}</Text>
      <Text style={styles.jumlahJamKerja}>Jumlah Jam Kurang: {dataProfile.jam_kurang}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  role: {
    fontSize: 18,
    marginBottom: 5,
    color: '#666',
  },
  jumlahJamKerja: {
    fontSize: 16,
    color: '#999',
  },
});