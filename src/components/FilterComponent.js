import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleFilterChange = () => {
    if (selectedMonth !== '' && selectedYear !== '') {
      const selectedDate = moment(`${selectedMonth} ${selectedYear}`, 'MMMM YYYY').format('MMMM YYYY');
      onFilterChange(selectedDate);
    } else {
      onFilterChange('');
    }
  };

  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];
  
  const years = [
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },
    { label: '2031', value: '2031' },
    { label: '2032', value: '2032' },
  ];

  return (
    <View style={styles.filterContainer}>
      <RNPickerSelect
        placeholder={{ label: 'Select month', value: '' }}
        onValueChange={(value) => setSelectedMonth(value)}
        items={months}
      />
      <RNPickerSelect
        placeholder={{ label: 'Select year', value: '' }}
        onValueChange={(value) => setSelectedYear(value)}
        items={years}
      />
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterChange}>
        <Text>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterButton: {
    padding: 15,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default FilterComponent;
