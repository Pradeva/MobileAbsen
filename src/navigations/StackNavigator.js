import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { BottomTabNavigator } from './index';
import ROUTES from './Routes';
import { Login, BluetoothBle, DashHeader, Home, Carousel, MqttHome, ListData, ListDataCuti, ListDataLembur, Profile } from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { dataProfile } = useSelector(state => state.user)
    return (
        <Stack.Navigator
            initialRouteName={dataProfile === null ? ROUTES.LOGIN : ROUTES.HOME}
        >
            <Stack.Screen name={ROUTES.LOGIN} component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.HOME} component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.DASHBOARD_HEADER} component={DashHeader}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.CAROUSEL} component={Carousel}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.TABSCREEN} component={BottomTabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.BLUETOOTH} component={BluetoothBle}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.MQTT} component={MqttHome}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.DEMOLISTVIEW} component={ListData}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.CUTI} component={ListDataCuti}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.LEMBUR} component={ListDataLembur}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={ROUTES.PROFILE} component={Profile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;