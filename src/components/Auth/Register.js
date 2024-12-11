import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import toebg from '../../assets/images/login_bg.jpeg';
// const logo = require("../../assets/logo.png")

// contact me :)
// instagram: must_ait6
// email : mustapha.aitigunaoun@gmail.com

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
export default function Register({navigation}) {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [click, setClick] = useState(false);
  const [mail, setmail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const regiter = async() => {
    console.log(name, mail, password);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userId,
        email: userId,
        password: '',
        university: selectedOption,
        role: selectedOptionoccupation,
        streams: inputText,
        personal_type: selectedPersonality,

      }),
    };

    try{
      var match_res = await fetch(safemind_create_account, requestOptions);
      console.log(match_res);
      var res = await match_res.json();
      console.log(res,"ress!!")

      if (res.success == true) {
        var stringifyData = JSON.stringify(res.data.Data);
        var stringifyDatatoken = JSON.stringify(res.data.token);
          console.log(stringifyData,"stringifyData")

        await EncryptedStorage.setItem(
          'secrets_login_safeminds',
          JSON.stringify({
            acesstoken: stringifyDatatoken,
            data: stringifyData,
          }),
        );
        handleLogin();

      }

    }catch(e){
      console.log(e)
    }
  };
  const login = () => {
    navigation.navigate('Login');

  };
  return (
    <ImageBackground
      source={toebg}
      blurRadius={0}
      resizeMethod="cover"
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}>
          <View style={{width: width * 0.95, padding: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/images/back_w.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{color: '#fff', fontSize: 15,fontWeight:'800'}}>Register</Text>
              <View></View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          {/* <Text style={styles.title}>SafeMind</Text> */}
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="USERNAME"
              value={name}
              // onChangeText={setname}
              onChangeText={name => setname(name)}
              autoCorrect={false}
              placeholderTextColor={'#ccc'}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="EMAIL OR USERNAME"
              value={mail}
              // onChangeText={setUsername}
              onChangeText={mail => setmail(mail)}
              autoCorrect={false}
              placeholderTextColor={'#ccc'}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              secureTextEntry
              value={password}
              onChangeText={password => setPassword(password)}
              autoCorrect={false}
              placeholderTextColor={'#ccc'}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.rememberView}>
            <View style={styles.switch}>
              <Switch
                value={click}
                onValueChange={setClick}
                trackColor={{true: 'green', false: 'gray'}}
              />
              <Text style={styles.rememberText}>Remember Me</Text>
            </View>
            <View>
              <Pressable onPress={() => Alert.alert('Forget Password!')}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={regiter}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            {/* <Text style={styles.optionsText}>OR LOGIN WITH</Text> */}
          </View>
          <TouchableOpacity onPress={login}>
            <Text style={styles.footerText}>
              Already Have Account?<Text style={styles.signup}> LogIn</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems : "center",
    // paddingTop: 70,
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 20,
    color: '#000',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 7,
    color: '#fff',
  },
  rememberView: {
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
  },
  forgetText: {
    fontSize: 11,
    color: 'red',
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'blue',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'gray',
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
  },
  signup: {
    color: 'red',
    fontSize: 13,
    fontWeight: '700',
  },
});
