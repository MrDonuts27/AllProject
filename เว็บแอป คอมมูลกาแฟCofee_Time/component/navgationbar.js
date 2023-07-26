import React from 'react';
import 'react-native-gesture-handler';
import { View, Image, StyleSheet,Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import MenuScreen from '../screens/MenuScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const nav = createBottomTabNavigator();

const Navigationbar = () => {
    return (
            <nav.Navigator screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#4B1F0B',
                    marginHorizontal: 20,
                    bottom: 10,
                    height: 70,
                    borderRadius: 15,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.45,
                    shadowRadius: 3,
                    elevation: 5,
                    paddingTop: 5,
                    paddingBottom: 10
                },
                tabBarLabelStyle: {
                    fontSize: 14,   
                },
                headerShown: false,
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: '#F5E7C5'

            }}>
                <nav.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={style.tabcontainer}>
                                    <Image source={require('../assets/icon/home.png')}
                                        resizeMode="contain"
                                        style={[style.imgsize, { tintColor: focused ? '#F5E7C5' : 'white' }]} />
                                </View>);
                        }
                    }}
                />
                <nav.Screen name="Menu" component={MenuScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={style.tabcontainer}>
                                    <Image source={require('../assets/icon/apps.png')}
                                        resizeMode="contain"
                                        style={[style.imgsize, { tintColor: focused ? '#F5E7C5' : 'white' }]} />
                                </View>);
                        }
                    }}
                />
                <nav.Screen name="Map" component={MapScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={style.tabcontainer}>
                                    <Image source={require('../assets/icon/map.png')}
                                        resizeMode="contain"
                                        style={[style.imgsize, { tintColor: focused ? '#F5E7C5' : 'white' }]} />
                                </View>);
                        }
                    }}
                />
                <nav.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={style.tabcontainer}>
                                    <Image source={require('../assets/icon/user.png')}
                                        resizeMode="contain"
                                        style={[style.imgsize, { tintColor: focused ? '#F5E7C5' : 'white' }]} />
                                </View>);
                        }
                    }}
                />
            </nav.Navigator>
    );
};

const style = StyleSheet.create({
    tabcontainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgsize: {
        width: 25,
        height: 25,

    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    
});

export default Navigationbar;