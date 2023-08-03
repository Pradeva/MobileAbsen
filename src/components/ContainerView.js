import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '../constants/Styles';

export default function ContainerView({ children, style }) {
    return (
        <View style={[style, { flex: 1, backgroundColor: "#FFFFFF" }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})