import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const App = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');

  const [minutes, setMinutes] = useState('10'); // Default time in minutes
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [animationScale] = useState(new Animated.Value(1)); // Animation scale for the tomato icon

  // Start Timer Logic
  useEffect(() => {
    let interval = null;
    if (isRunning && (parseInt(minutes) > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes !== '0') {
          setMinutes(prevMinutes => (parseInt(prevMinutes) - 1).toString());
          setSeconds(59);
        } else if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else {
          clearInterval(interval);
          setIsRunning(false);
          setMinutes('10'); // Reset to default time after completion
          setSeconds(0);
        }
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  // Tomato Animation: pulse effect
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationScale, {
            toValue: 1.2,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animationScale, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      animationScale.stopAnimation();
    }
  }, [isRunning]);

  // Format seconds into MM:SS
  const formatTime = () => {
    const min = parseInt(minutes) < 10 ? `0${minutes}` : minutes;
    const sec = seconds < 10 ? `0${seconds}` : seconds;
    return `${min}:${sec}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View
          style={{
            width: width * 0.95,
            padding: 0,
            marginBottom: 10,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../../../assets/images/back.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>

              <Text style={{fontSize: 12, fontWeight: '800', color: '#000'}}>
                {' '}
                Pomodoro Timer
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <View style={{width: width * 0.9}}>
            <Text style={{color: '#000'}}>Set Pomodoro Time (Minutes)</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Set minutes"
                value={minutes}
                onChangeText={text => setMinutes(text)}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#000',
            width: width * 1,
          }}></View>
        {/* Tomato Animation */}
        <Animated.View
          style={[styles.tomato, {transform: [{scale: animationScale}]}]}>
          <Text style={styles.tomatoEmoji}>🍅</Text>
        </Animated.View>

        {/* Time Display */}
        <Text style={styles.timer}>{formatTime()}</Text>

        {/* Time Input */}

        {/* Control Buttons */}
      </View>


        <View style={{position:'absolute',left:'20%',bottom:30}}>
          <TouchableOpacity onPress={() => setIsRunning(prev => !prev)}>
            <View>
              {isRunning ? (
                <Image
                  source={require('../../../../assets/images/pause.png')}
                  style={{width: 50, height: 50}}></Image>
              ) : (
                <Image
                  source={require('../../../../assets/images/play.png')}
                  style={{width: 50, height: 50}}></Image>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{position:'absolute',right:'20%',bottom:30}}>
          <TouchableOpacity
            onPress={() => {
              setIsRunning(false);
              setMinutes('10'); // Reset to default 25 minutes
              setSeconds(0);
            }}>
            <View>
              <Image
                source={require('../../../../assets/images/reset.png')}
                style={{width: 50, height: 50}}></Image>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Button
            title={isRunning ? 'Pause' : 'Start'}
            onPress={() => setIsRunning(prev => !prev)}
          /> */}
        {/* <Button
            title="Reset"
            onPress={() => {
              setIsRunning(false);
              setMinutes('10'); // Reset to default 25 minutes
              setSeconds(0);
            }}
          /> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tomato: {
    marginBottom: 20,
  },
  tomatoEmoji: {
    fontSize: 80,
  },
  timer: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 20,
    color:'#000'
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',

    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    width: width * 0.9,
    height: 50,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
});

export default App;
