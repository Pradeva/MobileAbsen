import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalHeights, GlobalWidths } from '../constants/Styles';
import { GlobalImages } from '../constants/Images';
import { ProfileImage } from '../components';

export default function ProfileScreen() {
  const { dataProfile } = useSelector(state => state.user);

  const convertToHours = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} jam ${remainingMinutes} menit`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={GlobalImages.BGPROFILE} style={styles.header}>
        <View style={styles.profileImageContainer}>
        <ProfileImage size={80} />
        </View>
        <Text style={styles.name}>{dataProfile.name}</Text>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.infoTitle}>Informasi User</Text>

        <View style={styles.infoList}>
          <InfoItem label="Sisa Cuti" value={dataProfile.sisa_cuti} />
          <InfoItem label="Jumlah Jam Lebih" value={convertToHours(dataProfile.jam_lebih)} />
          <InfoItem label="Jumlah Jam Kurang" value={convertToHours(dataProfile.jam_kurang)} />
        </View>
      </View>
    </ScrollView>
  );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#4a90e2',
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 115
  },
  content: {
    padding: 20,
  },
  profileImageContainer: {
    position: 'absolute',
    top: 0,
    left: 140,
    right: 0,
    alignItems: 'center',
    marginTop: 40, // Atur jarak atas sesuai kebutuhan
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoList: {
    marginTop: 0,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 18,
    color: '#666',
  },
});
