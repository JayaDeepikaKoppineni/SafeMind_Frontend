import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-picker/picker';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const NextPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionoccupation, setSelectedOptionoccupation] = useState('');
  const [inputText, setInputText] = useState('');
  const refRBSheet = useRef();
  useEffect(() => {
    refRBSheet.current.open();
  },[])
  const handleContinue = () => {
    // Handle the continue action
    console.log('Selected Option:', selectedOption);
    console.log('Selected Option occupation:', selectedOptionoccupation);
    console.log('Input Text:', inputText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top 50% with Local Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/safemind.png')} // Replace with your local image path
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,.6)',
            },
            draggableIcon: {
              backgroundColor: '#000',
              width: '10%',
            },
            container: {
              ...styles.bottom12,
              height: '50%',
            },
          }}>
          <View>
          <View style={{alignItems: 'center'}}>
          <View style={{width: width * 0.9}}>
            <View style={{}}>
              <Text style={styles.label}>Select university</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={itemValue => setSelectedOption(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="Choose an option..." value="" />
                  <Picker.Item
                    label="Saint Louis university"
                    value="Saint Louis university"
                  />
                  <Picker.Item
                    label="Missouri state university "
                    value="Missouri state university "
                  />
                  <Picker.Item
                    label="Washington university"
                    value="Washington university"
                  />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>

              <Text style={styles.label}>Select Role</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedOptionoccupation}
                  onValueChange={itemValue =>
                    setSelectedOptionoccupation(itemValue)
                  }
                  style={styles.picker}>
                  <Picker.Item label="Choose an option..." value="" />
                  <Picker.Item label="Student" value="Student" />
                  <Picker.Item label="Faculty" value="Faculty" />
                  <Picker.Item label="Staff" value="Staff" />
                  <Picker.Item label="Alumni" value="Alumni" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>

              {/* Text Input */}
              <Text style={styles.label}>Enter your answer:</Text>
              <TextInput
                style={styles.input}
                placeholder="Type here..."
                value={inputText}
                onChangeText={inputText => setInputText(inputText)}
                placeholderTextColor={'#ccc'}
              />

              {/* Continue Button */}
              <Button
                title="Continue"
                onPress={handleContinue}
                color="#007AFF"
              />
            </View>
          </View>
        </View>

          </View>

          </RBSheet>

      {/* Bottom 50% with Dropdown, Input, and Button */}
      {/* <View style={styles.bottomContainer}>
       
      </View> */}
    </SafeAreaView>
  );
};

export default NextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: height * 0.3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    height: height * 0.8,

    // justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
});
