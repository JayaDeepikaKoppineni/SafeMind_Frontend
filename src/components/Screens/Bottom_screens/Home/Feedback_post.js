import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Feedback_post = ({navigation}) => {
    const [message, setmessage] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
          <View
            style={{
              width: width * 0.95,
              padding: 0,
              marginBottom: 15,
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../../../assets/images/back.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>

                <Text style={{fontSize: 16, fontWeight: '800', color: '#000'}}>
                  {' '}
                  Feedback Post
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop:20}}>
        <View
          style={{
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
            marginTop: 0,
          }}>
          <View style={styles.inputContainer}>
          <Text style={{color:'#000',marginBottom:20,marginTop:20}}>Enter Message</Text>
            <View style={styles.inputView2}>
              <TextInput
                style={styles.TextInput2}
                onChangeText={message => setmessage(message)}
                placeholder="Enter Message"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                // ref={passwordInputRef}
                // onSubmitEditing={Keyboard.dismiss}

                underlineColorAndroid="#f000"

                // value={password}
              />
              <View></View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.loginBtn} >
                      <Text style={styles.loginText}> Send Message</Text>
                    </TouchableOpacity>
                  </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback_post;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    // width: '100%',
    // marginBottom: 20,
  },
  TextInput2: {
    height: 90,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    color: '#000',
    fontWeight: '600',
  },
  inputView2: {
    borderColor: '#000',
    borderRadius: 10,
    // width: "70%",
    // height: 45,
    width: width * 0.95,
    height: height * 0.15,
    shadowColor: '#000',
    marginBottom: 15,
    backgroundColor: '#fff',
    // alignItems: "center",

    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},

    elevation: 13,
    color: '#000',
    fontWeight: '600',
    borderWidth:1,
    borderColor:'#000'
  },
  loginBtn: {
    width: width * 0.95,
    height: height * 0.05,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.01,
    backgroundColor: 'blue',
  },
  loginText: {
    color: '#fff',
  },
});
