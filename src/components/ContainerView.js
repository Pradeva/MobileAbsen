import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalColors } from '../constants/Styles';

export default function ContainerView({ children, style }) {
    return (
        <View style={[style, { flex: 1, backgroundColor: "#FEF8F6" }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})