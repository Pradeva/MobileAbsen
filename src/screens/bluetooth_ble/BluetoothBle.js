import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function BluetoothBle() {
    return (
        <>
            <StatusBar hidden />
            <SafeAreaView style={styles.body}>
                <Pressable 
                    style={styles.scanButton} 
                    // onPress={startScan}
                >
                    <Text style={styles.scanButtonText}>
                        {/* {isScanning ? 'Scanning...' : 'Scan Bluetooth'} */}
                        Scan Bluetooth
                    </Text>
                </Pressable>

                {/* {Array.from(peripherals.values()).length == 0 && ( */}
                <View style={styles.row}>
                    <Text style={styles.noPeripherals}>No Peripherals, press "Scan Bluetooth" above</Text>
                </View>
                {/* )} */}
                {/* <FlatList
                    data={Array.from(peripherals.values())}
                    contentContainerStyle={{ rowGap: 12 }}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> */}
            </SafeAreaView>
        </>
    )
}


const boxShadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}


const styles = StyleSheet.create({
    engine: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        color: Colors.black,
    },
    scanButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: "#0a398a",
        margin: 10,
        borderRadius: 12,
        ...boxShadow

    },
    scanButtonText: {
        fontSize: 20,
        letterSpacing: 0.25,
        color: Colors.white,
    },
    body: {
        backgroundColor: '#0082FC',
        flex: 1,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    peripheralName: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    rssi: {
        fontSize: 12,
        textAlign: 'center',
        padding: 2,
    },
    peripheralId: {
        fontSize: 12,
        textAlign: 'center',
        padding: 2,
        paddingBottom: 20,
    },
    row: {
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        ...boxShadow
    },
    noPeripherals: {
        margin: 10,
        textAlign: 'center',
        color: Colors.white
    },
});