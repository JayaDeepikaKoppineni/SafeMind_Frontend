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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import MultiAccordion from 'react-native-multi-flow-accordion';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';

import EncryptedStorage from 'react-native-encrypted-storage';
import {safemind_create_account} from '../Api/Api';
import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('window');


const StartScreen = ({navigation, handleLogin}) => {
  const {width} = Dimensions.get('window');
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionoccupation, setSelectedOptionoccupation] = useState('');
  const [inputText, setInputText] = useState('');
  const refRBSheet = useRef();
  const [userId, setUserId] = useState('User1000'); // Initial user ID
  const [error, seterror] = useState('');

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [openUniversity, setOpenUniversity] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [openRole, setOpenRole] = useState(false);

  const [selectedPersonality, setSelectedPersonality] = useState(null);
  const [openPersonality, setOpenPersonality] = useState(false);

  const handleContinue = async () => {

    if (
      selectedUniversity &&
      selectedRole &&
      inputText &&
      selectedPersonality
    ) {
      seterror('');
      refRBSheet.current.close();
      // Handle the continue action
      console.log('Selected Option:', selectedOption);
      console.log('Selected Option occupation:', selectedOptionoccupation);
      console.log('Input Text:', inputText);

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

      try {
        var match_res = await fetch(safemind_create_account, requestOptions);
        console.log(match_res);
        var res = await match_res.json();
        console.log(res, 'ress!!');

        if (res.success == true) {
          var stringifyData = JSON.stringify(res.data.Data);
          var stringifyDatatoken = JSON.stringify(res.data.token);
          console.log(stringifyData, 'stringifyData');

          await EncryptedStorage.setItem(
            'secrets_login_safeminds',
            JSON.stringify({
              acesstoken: stringifyDatatoken,
              data: stringifyData,
            }),
          );
          handleLogin();
        }
      } catch (e) {
        console.log(e, 'errors');
      }
    } else {
      seterror('Please fill all the fields');
    }
  };

  React.useEffect(() => {
    // Check if tooltips have been shown before
    AsyncStorage.getItem('tooltipsShownAuthrequest').then(value => {
      if (!value) {
        // First time user, show tooltips
        setShowTooltip1(true);
        AsyncStorage.setItem('tooltipsShownAuthrequest', 'true');
      }
    });
  }, []);
  const datafaq = [
    {
      question: 'What Is Mindful Self-Reflection?',
      answer:
        'To self-reflect is to take the time to inquire more deeply into our experience. Also referred to as introspection, it asks us to examine our thoughts, our feelings, our assumptions, and our judgments, a process which helps us to grow.',
    },
    {
      question: 'The Benefits of Mindful Self-Reflection',
      answer:
        'We do not need to reach the deepest practice of self-enquiry in order to experience the benefits of mindful self-reflection. As mentioned, mindful self-reflection has a range of benefits. For instance, it can:',
    },
    {
      question: 'When to meditate?',
      answer:
        'Generally speaking, the best time to meditate is early morning, right after a trip to the bathroom but before breakfast. Having said that, any time that fits your schedule is good, and the most important thing is to choose a time when you are more likely to actually do it.',
    },
    // {
    //   question: 'Where to meditate?',
    //   answer:
    //     'Meditating always in the same place and time is a good help in focusing the mind. Your brain associates that place with the practice, so it is easier for you to focus. There is less distraction involved.',

    // },
  ];
  const data = [
    {
      id: 1,
      title: '5 Visualization Techniques to Add to Your Meditation Practice',
      body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
      link: 'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med1.jpg'),
    },
    {
      id: 2,
      title: 'Exploring the Benefits of Meditation for Anxietys',
      body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
      link: 'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med2.jpg'),
    },
    {
      id: 3,
      title: 'How Meditation Benefits Your Mind and Body',
      body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
      link: 'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med3.jpg'),
    },
    {
      id: 4,
      title: 'What Is Breathwork Meditation?',
      body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
      link: 'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med4.jpg'),
    },
  ];

  const dataJOurling = [
    {
      id: 1,
      title: 'What Is Breathwork Meditation?',
      body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
      link: 'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med4.jpg'),
    },
    {
      id: 2,
      title: '5 Visualization Techniques to Add to Your Meditation Practice',
      body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
      link: 'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med1.jpg'),
    },

    {
      id: 3,
      title: 'How Meditation Benefits Your Mind and Body',
      body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
      link: 'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med3.jpg'),
    },

    {
      id: 4,
      title: 'Exploring the Benefits of Meditation for Anxietys',
      body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
      link: 'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
      imgUrl: require('../../assets/images/med2.jpg'),
    },
  ];

  const databenfits = [
    {
      id: 1,
      imgUrl: require('../../assets/images/ben1.jpg'),
    },
    {
      id: 2,
      imgUrl: require('../../assets/images/ben2.jpg'),
    },
    {
      id: 3,
      imgUrl: require('../../assets/images/ben3.jpg'),
    },
  ];

  const [handleclick, sethandleclick] = useState('Medition');

  const changeoption = text => {
    sethandleclick(text);
  };

  const works = () => {};

  const openarticle = async link => {
    InAppBrowser.close();

    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // Android Properties
          showTitle: true,
          toolbarColor: '#000',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          showInRecents: true,
        }).then(async result => {
          console.log('then erorrrrrrrrrrrrrr');
          navigation.navigate('Bottomnavbar');
        });
      }
    } catch (e) {
      console.log('then erorrrrrrrrrrrrrr');
      navigation.navigate('Bottomnavbar');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: width * 0.95}}>
          <View style={styles.container1}>
            <Image source={item.imgUrl} style={styles.image1} />

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                overflow: 'hidden',
                marginLeft: 10,
                width: width * 0.6,
              }}
              onPress={() => openarticle(item.link)}>
              <Text style={styles.header1}>{item.title}</Text>
              <Text style={styles.body1}>{item.body}</Text>
              <View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: 'red',

                      fontSize: 12,
                    }}>
                    {'Read More>>'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderImage = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#ccc',
          borderWidth: 1,
          borderColor: '#ccc',
          marginRight: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,

          elevation: 17,
          borderRadius: 10,
        }}>
        <Image
          source={item.imgUrl}
          style={{width: 100, height: 100, borderRadius: 10}}
        />
      </View>
    );
  };
  const howitworks = () => {
    navigation.navigate('HowitWorks');
  };

  const handleRigister = () => {
    refRBSheet.current.open();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const newUserId = `User${randomNum}`;
    setUserId(newUserId); // Update the user ID in state
    // handleLogin();
    // navigation.navigate('Final_page')
  };
  const handleLoginpress = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View
          style={{
            width: width * 0.95,
            padding: 0,
            marginBottom: 5,
            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../assets/images/safemind_logo.png')}></Image>
              <Text style={{fontSize: 15, fontWeight: '800', color: '#000'}}>
                SafeMind
              </Text>
            </View>
            <TouchableOpacity>
              {/* <Text
                style={{
                  color: 'blue',
                  fontWeight: '900',
                  fontSize: 15,
                }}>
                Login?
              </Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            width: width * 0.95,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#b3ecff',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => changeoption('Medition')}
            style={[
              styles.header,
              {
                borderRadius: 20,

                backgroundColor:
                  handleclick == 'Medition' ? '#cccccc' : '#b3ecff',
              },
            ]}>
            <View>
              <Text style={{color: '#000', fontSize: 15}}>Medition</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeoption('Journaling')}
            style={[
              styles.header,
              {
                borderRadius: 20,
                backgroundColor:
                  handleclick == 'Journaling' ? '#cccccc' : '#b3ecff',
              },
            ]}>
            <View>
              <Text style={{color: '#000', fontSize: 15}}>Journaling</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {handleclick == 'Medition' ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 0}}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            {/* <Journaling /> */}
            <FlatList
              data={dataJOurling}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 0}}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{width: width * 0.95}}>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '800',
            }}>
            Benfits of SafeMind
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <View style={{width: width * 0.95, marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.imagecard}>
              <Image
                source={require('../../assets/images/ben1.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={styles.imagecard}>
              <Image
                source={require('../../assets/images/ben2.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
            <View style={styles.imagecard}>
              <Image
                source={require('../../assets/images/ben3.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={{width: width * 0.95}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '800'}}>
            FAQ
          </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <MultiAccordion
          containerStyle={{fontSize: 10}}
          answerTextStyle={{fontSize: 10}}
          questionTextStyle={{fontSize: 10}}
          data={datafaq}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 25,
          right: 0,
          left: 0,
        }}>
        <TouchableOpacity
          onPress={handleRigister}
          style={{
            width: width * 0.8,
            height: 40,
            backgroundColor: '#007AFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <View>
            <Tooltip
              // style={{width: 40}}
              animated={true}
              // arrowSize={{width: 16, height: 8}}
              backgroundColor="rgba(0,0,0,0.5)"
              isVisible={showTooltip1}
              content={
                <Text style={{color: '#000', fontSize: 10}}>
                  Click here to continue
                </Text>
              }
              placement="top"
              onClose={async () => {
                setShowTooltip1(false);
              }}>
              <Text style={{color: '#fff'}}>Continue as Guest</Text>
            </Tooltip>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 20}} onPress={howitworks}>
          <View>
            <Text
              style={{
                color: 'blue',
                fontSize: 15,
                textDecorationLine: 'underline',
              }}>
              How It Works
            </Text>
          </View>
        </TouchableOpacity>
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
            height: '85%',
          },
        }}>
        <View>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{alignItems: 'center'}}>
              <View style={{width: width * 0.9}}>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontWeight: '800',
                    }}>
                    {userId}
                  </Text>
                  <Text style={styles.label}>Select university</Text>
                  {/* <View style={[styles.pickerContainer, {zIndex: 1}]}>
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
                  </View> */}
                  <DropDownPicker
                    open={openUniversity}
                    value={selectedUniversity}
                    items={[
                      {label: 'Choose an option...', value: null},
                      {
                        label: 'Saint Louis university',
                        value: 'Saint Louis university',
                      },
                      {
                        label: 'Missouri state university',
                        value: 'Missouri state university',
                      },
                      {
                        label: 'Washington university',
                        value: 'Washington university',
                      },
                      {label: 'Others', value: 'Others'},
                    ]}
                    setOpen={setOpenUniversity}
                    setValue={setSelectedUniversity}
                    placeholder="Choose an option..."
                    style={styles.picker}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={3000}  // Adjust the zIndex higher for the dropdown
                    zIndexInverse={1000}  // Set a lower inverse zIndex for other components
             testID="university-input"
                  />

                  <Text style={styles.label}>Select Role</Text>
                  <DropDownPicker
                    open={openRole}
                    value={selectedRole}
                    items={[
                      {label: 'Choose an option...', value: null},
                      {label: 'Student', value: 'Student'},
                      {label: 'Faculty', value: 'Faculty'},
                      {label: 'Staff', value: 'Staff'},
                      {label: 'Alumni', value: 'Alumni'},
                      {label: 'Others', value: 'Others'},
                    ]}
                    setOpen={setOpenRole}
                    setValue={setSelectedRole}
                    placeholder="Choose an option..."
                    style={styles.picker}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={2000}  // Adjust the zIndex higher for the dropdown
                    zIndexInverse={900}  // Set a lower inverse zIndex for other components
                   testID="role-input"
                  />

                  {/* 
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
                  </View> */}

                  {/* Text Input */}
                  <Text style={styles.label}>Enter your Streams:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Streams ..."
                    value={inputText}
                    onChangeText={inputText => setInputText(inputText)}
                    placeholderTextColor={'#ccc'}
                       testID="name-input"
                  />

                  <Text style={styles.label}>Select Personality Type</Text>
                  <DropDownPicker
                    open={openPersonality}
                    value={selectedPersonality}
                    items={[
                      {label: 'Choose an option...', value: null},
                      {label: 'Explorer', value: 'Explorer'},
                      {label: 'Shopper', value: 'Shopper'},
                      {label: 'Prisoner', value: 'Prisoner'},
                      {label: 'Vacationer', value: 'Vacationer'},
                    ]}
                    setOpen={setOpenPersonality}
                    setValue={setSelectedPersonality}
                    placeholder="Choose an option..."
                    style={styles.picker}
                    dropDownContainerStyle={styles.dropdownContainer}
                    zIndex={1000}  // Adjust the zIndex higher for the dropdown
                    zIndexInverse={800}  // Set a lower inverse zIndex for other components
                testID="personality-input"
                  />

                  {/* <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedPersonality}
                      onValueChange={itemValue =>
                        setSelectedPersonality(itemValue)
                      }
                      style={styles.picker}>
                      <Picker.Item label="Choose an option..." value="" />
                      <Picker.Item label="Explorer" value="Explorer" />
                      <Picker.Item label="Shopper" value="Shopper" />
                      <Picker.Item label="Prisoner" value="Prisoner" />
                      <Picker.Item label="Vacationer" value="Vacationer" />
                    </Picker>
                  </View> */}

                  {error && (
                    <View>
                      <Text style={{color: 'red'}}>{error}</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={{
                      width: width * 0.9,
                      height: 40,
                      backgroundColor: '#007AFF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    
                    }}
                    testID="signup-button" 
                    onPress={handleContinue}>
                    <View>
                      <Text style={{color: '#fff'}}>Continue</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dottedLine: {
    width: 1, // Thickness of the line
    height: 20, // Height of the dotted line
    borderStyle: 'dotted', // Makes the line dotted
    borderWidth: 1, // Thickness of the dots
    borderColor: '#000', // Color of the dots
    borderRadius: 1, // Adjust this for round dots
  },
  header: {
    width: width * 0.45,
    // backgroundColor: 'blue',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  container1: {
    backgroundColor: 'white',
    borderRadius: 8,

    flexDirection: 'row',

    overflow: 'hidden',
    height: 150,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image1: {
    width: 100,
    height: 'auto',
    objectFit: 'cover',
    // objectFit:
  },
  header1: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  body1: {
    color: '#222',
    fontSize: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  picker: {
    height: 45,
    width: '100%',
    color: '#000',
    fontSize: 12,
    marginBottom:10
  },
  input: {
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  imagecard: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    borderRadius: 10,
  },
});
