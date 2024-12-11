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

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
export default function LoginForm({navigation, handleLogin}) {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log(username, password, '---');
    if (username == 'admin' && password == 'admin') {
      handleLogin();
    } else {
      alert('Please Enter details');
    }
  };
  const singup = () => {
    navigation.navigate('Register');
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
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>
                Login
              </Text>
              <View></View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          {/* <Text style={styles.title}>SafeMind</Text> */}
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="EMAIL OR USERNAME"
              value={username}
              // onChangeText={setUsername}
              onChangeText={name => setUsername(name)}
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
                trackColor={{true: 'green', false: '#fff'}}
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
            <Pressable style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
            {/* <Text style={styles.optionsText}>OR LOGIN WITH</Text> */}
          </View>
          <TouchableOpacity onPress={singup}>
            <Text style={styles.footerText}>
              Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
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
    color: '#fff',
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
    marginBottom: 10,
  },
  rememberView: {
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
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

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
    marginTop: 20,
  },
  signup: {
    color: 'red',
    fontSize: 13,
  },
});
