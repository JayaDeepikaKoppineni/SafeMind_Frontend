import React, { useState } from 'react';
import {
  View,
  ImageBackground,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Bottom_screens/Home';
import Profile from '../Bottom_screens/Profile';


const Tab = createBottomTabNavigator();

export default function App({handleLogout }) {

  return (

    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,

        

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth:1,
          borderTopColor:'#ccc'
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <ImageBackground
                  source={require('../../../assets/images/home.png')}
                  style={{
                    width: 22,
                    height: 22,
                  }}
                  imageStyle={{
                    tintColor: focused ? '#fff': '#8F8F8F',
                  }}
                />
              </View>
            );
          },
        }}

        name="Home"
        component={Home}  
        testID="homeButton"
    
        />

     


      <Tab.Screen
      
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View style={{ alignItems: 'center' }}>
              <ImageBackground
                source={require('../../../assets/images/profile2.png')}
                style={{
                  width: 22,
                  height: 22,
                }}
                imageStyle={{
                  tintColor: focused ? '#fff': '#8F8F8F',
                }}
              />
            </View>
          );
        },
      }}
      name="Profile" component={Profile} 
      testID="profileButton"
      initialParams={{ handleLogout }} 
      />


    </Tab.Navigator>

  )
}
