import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1 } from './Tab1';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import { Tab2Screen } from './Tab2';


const Tab = createBottomTabNavigator();



export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6', // el color del tab activo
                tabBarLabelStyle:{
                    marginBottom: ( Platform.OS === 'ios') ? 0 : 10 // Si el dispositivo es IOS: margin 0-- si es android: margin 10
                },
                tabBarStyle:{
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255, 0.92)', // Hacer los tabs semi traslucidos
                    borderWidth: 0, // IOS
                    elevation: 0, // Android
                    height: (Platform.OS === 'ios') ? 70 : 60 // la altura de los tabs dependiendo del OS
                }
            }}
        >
        <Tab.Screen
            name="HomeScreen"
            component={ Tab1 }
            options={{
                tabBarLabel: "Listado",
                tabBarIcon: ({ color }) => (
                    <Icon
                        color={ color }
                        size={ 25 }
                        name="list-outline"
                    />
                )
            }}
        />

        <Tab.Screen
            name="SearchScreen"
            component={ Tab2Screen }
            options={{
                tabBarLabel: "Búsqueda",
                tabBarIcon: ({ color }) => (
                    <Icon
                        color={ color }
                        size={ 25 }
                        name="search-outline"
                    />
                )
            }}
        />
        </Tab.Navigator>
    );
};
