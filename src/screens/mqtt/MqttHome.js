import { StyleSheet, Text, Button, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Paho from "paho-mqtt";
//10.168.1.88:1883 
//202.180.21.198:5032 

client = new Paho.Client(
    "mqtt-dashboard.com",
    Number(8884),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

const MqttHome = () => {

    const [msg, setMsg] = useState('');

    const onMessage = (message) => {
        if (message.destinationName === "testtopic/1")
            setMsg(message.payloadString)
            // console.log('message : ', message.payloadString)
    }

    useEffect(() => {
        client.connect({
            useSSL: true,
            keepAliveInterval: 60,
            onSuccess: () => {
                console.log("Connected!");
                client.subscribe("testtopic/1");
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {
                console.log("Failed to connect!");
            }
        });
    }, [])

    const changeValue = (c) => {
        const message = new Paho.Message('asik');
        message.destinationName = "testtopic/1";
        c.send(message);
    }

    return (
        <View style={styles.container}>
            <Text>Message is: {msg}</Text>
            <Button onPress={() => changeValue(client)} title="Press Me" />
        </View>
    )
}

export default MqttHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});