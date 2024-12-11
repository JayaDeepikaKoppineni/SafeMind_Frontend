// MainNavigator.js
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import StartScreen from '../start/StartScreen';
import HowitWorks from '../start/HowitWorks';
import Bottomsheet from '../Screens/Nav/Bottomsheet';
import Feedback_post from '../Screens/Bottom_screens/Home/Feedback_post';
import Groups from '../Screens/Bottom_screens/Home/Groups';
import Final_page from '../Auth/Final_page';
import Chatting from '../Screens/Bottom_screens/Home/Chatting';
import Pomodoro from '../Screens/Bottom_screens/Profile/Pomodoro';

const Stack = createStackNavigator();

const config = {
  screens: {
    Post: {
      path: 'post/:postId',
      parse: {
        postId: postId => `${postId}`,
      },
    },
  },
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await EncryptedStorage.getItem('secrets_login_safeminds');
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
   
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    // await EncryptedStorage.setItem('secrets_login_gym', 'some-token');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await EncryptedStorage.removeItem('secrets_login_gym');
    setIsLoggedIn(false);
  };

  if (loading) {
    // You can return a loading screen or spinner here
    return (
      <View style={{flex: 1, backgroundColor: '#99ff99'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            {/* <Image style={{ width: 80, height: 60 }} source={require('../../assets/images/safemind.png')}></Image> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
             <Image style={{ width: 200, height: 200 }} source={require('../../assets/images/safemind.png')}></Image>
            {/* <LottieView style={{ width: '40%', alignItems: 'center', }} source={require('../../assets/jsons/gym_loder_main.json')} autoPlay loop /> */}
            <Text style={{color: '#000', fontSize: 14, fontWeight: '900'}}>
              Please wait...
            </Text>
          </View>
        </View>
     
  
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false, // Hide header if not needed
        }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Bottomsheet">
              {props => <Bottomsheet {...props} handleLogout={handleLogout} />}
            </Stack.Screen>

            <Stack.Screen
              name="Feedback_post"
              component={Feedback_post}
              options={{headerShown: false}}
            />
               <Stack.Screen
              name="Groups"
              component={Groups}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="Chatting"
              component={Chatting}
              options={{headerShown: false}}
            />
                <Stack.Screen
              name="Pomodoro"
              component={Pomodoro}
              options={{headerShown: false}}
            />

          </>
        ) : (
          <>
            <Stack.Screen name="StartScreen">
              {props => <StartScreen {...props} handleLogin={handleLogin} />}
            </Stack.Screen>

            <Stack.Screen name="HowitWorks">
              {props => <HowitWorks {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => <Login {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Final_page">
              {props => <Final_page {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <Register {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
         
            

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
