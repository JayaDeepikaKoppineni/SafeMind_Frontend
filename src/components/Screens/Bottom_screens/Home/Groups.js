import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tooltip from 'react-native-walkthrough-tooltip';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import EncryptedStorage from 'react-native-encrypted-storage';
import {createGroup, Group_get, Group_get_all} from '../../../Api/Api';

const {width} = Dimensions.get('window');
const Groups = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');

  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [groups, setgroups] = useState(false);
  const [collegename, setcollegename] = useState('');
  const [groupname, setgroupname] = useState('');
  const [date, setDate] = useState(new Date()); // Initial date state
  const [show, setShow] = useState(false); // Controls visibility of the picker
  // Controls visibility of the picker
  const [mode, setMode] = useState('date'); // Keeps track of date or time mode

  const [groupDescription, setGroupDescription] = useState('');
  const [rooms, setRooms] = useState([]);
  const [rooms_g, setRooms_g] = useState([]);

  const [showTooltip1, setShowTooltip1] = useState(false);

  React.useEffect(() => {
    // Check if tooltips have been shown before
    AsyncStorage.getItem('tooltipsShownHomegroup').then(value => {
      if (!value) {
        // First time user, show tooltips
        setShowTooltip1(true);
        AsyncStorage.setItem('tooltipsShownHomegroup', 'true');
      }
    });
  }, []);

  const onpressContinue = () => {
    setDialogBoxVisible(true);
  };
  // Handle date change
  // Function to handle the change event
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
    setDate(currentDate);
  };

  // Function to show DatePicker
  const showDatePicker = () => {
    setMode('date');
    setShow(true);
  };

  // Function to show TimePicker
  const showTimePicker = () => {
    setMode('time');
    setShow(true);
  };
  const [posts, setPosts] = useState([]);


  async function fetchGroups() {
    const session = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data = JSON.parse(session).data;
    const client_secret_token = JSON.parse(session).acesstoken;

    console.log(client_secret_data, 'client_secret_data');
    const responseData = JSON.parse(client_secret_data);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   userid: responseData[0].name,
      // }),
    };
    try {
      var match_res = await fetch(Group_get_all, requestOptions);
      var response = await match_res.json();
      console.log(response, 'response');
      if (response.result == 'success') {
        setRooms_g(response.data);
      } else {
        console.log('NO');
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
  
    fetchGroups();
  }, []);
  const handlecreate = async () => {
    if (groupname && groupDescription && date) {
      setDialogBoxVisible(false);
      const session = await EncryptedStorage.getItem('secrets_login_safeminds');
      const client_secret_data = JSON.parse(session).data;
      const client_secret_token = JSON.parse(session).acesstoken;

      console.log(client_secret_data, 'client_secret_data');
      const responseData = JSON.parse(client_secret_data);
      const randomNumber = Math.floor(
        100000000000 + Math.random() * 900000000000,
      );
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_name: groupname,
          streams: groupname,
          class_desc: groupDescription,
          class_date: date.toLocaleDateString(),
          class_time: date.toLocaleTimeString(),
          userid: responseData[0].name,
          university: responseData[0].university,
          group_number: randomNumber.toString(),
        }),
      };
      try {
        var match_res = await fetch(createGroup, requestOptions);
        var res = await match_res.json();

        console.log(res, 'res@@@@@@');
        if (res.success == true) {
          alert('Successfully created Group ');


          setgroupname('');
          setGroupDescription('');
          fetchGroups();
        } else {
          alert(res.Message);
          showToast('error', res.Message, 'top');
        }
      } catch (e) {
        alert('Please Try again');
        console.log(e, 'catch match');
      }
    } else {
      alert('Please Enter details');
    }
  };

  const handlecreatesend = async item => {
    const session = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data = JSON.parse(session).data;
    const client_secret_token = JSON.parse(session).acesstoken;

    console.log(client_secret_data, 'client_secret_data');
    const responseData = JSON.parse(client_secret_data);

    console.log(responseData[0].name, 'responseData[0].name');
    console.log(item, 'item');

    navigation.navigate('Chatting', {
      userKey: item,
      reciverKey: responseData[0].name,
    });
  };
  const renderChatItem = ({item}) => {
    return (
      <Pressable onPress={() => handlecreatesend(item)}>
        <View style={styles.cchat}>
          <View style={styles.icon}>
            <Image
              source={require('../../../../assets/images/group_icon.png')}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <View style={styles.crightContainer}>
            <View>
              {/* <Text style={styles.cmessage}>{item.university}</Text> */}
              <Text style={styles.cusername}>{item.groupd_name}</Text>

              {/* <Text style={styles.cmessage}>{item.class_desc}</Text> */}
            </View>
            <View>
              <Text style={styles.ctime}>{item.class_date} </Text>
              <Text style={styles.ctime}>{item.class_time}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View style={{width: width * 0.95, marginTop: 10, marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../../../assets/images/back_button.png')}></Image>
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 12, fontWeight: '800'}}>
              All Groups
            </Text>
            <Text></Text>
          </View>
        </View>
      </View>

      {rooms_g && rooms_g.length > 0 ? (
        <>
          <FlatList
            data={rooms_g}
            // renderItem={({item}) => <ChatComponent item={item} />}
            renderItem={renderChatItem}
            // keyExtractor={item => item.id}

            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: height * 0.1}}
          />
        </>
      ) : (
        <>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '800'}}>
              No Groups Available
            </Text>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={onpressContinue}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/images/add.png')}></Image>

                <Text style={{color: 'blue', fontSize: 15, fontWeight: '800'}}>
                  Create One
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <View>
        <Modal
          animationType="slide"
          transparent
          visible={dialogBoxVisible}
          presentationStyle="overFullScreen">
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <View style={{width: width * 0.8}}>
                  <Text style={styles.modalsubheading}>Create a New Group</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter Streams "
                    placeholderTextColor={'grey'}
                    value={groupname}
                    onChangeText={text => setgroupname(text)}
                  />
                  <TextInput
                    style={[styles.input, {height: 100}]}
                    placeholder="Class Description"
                    placeholderTextColor={'grey'}
                    multiline
                    value={groupDescription}
                    onChangeText={text => setGroupDescription(text)}
                  />

                  <TouchableOpacity
                    style={styles.input}
                    onPress={showDatePicker}>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 10,
                        }}>
                        {date ? date.toLocaleDateString() : 'Select Date'}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', top: 5, right: 10}}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../assets/images/date.png')}></Image>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={showTimePicker}>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 10,
                        }}>
                        {date ? date.toLocaleTimeString() : 'Select Date'}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', top: 5, right: 10}}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../assets/images/timer1.png')}></Image>
                    </View>
                  </TouchableOpacity>

                  {/* <Text style={styles.text}>
                    Selected Time: {date.toLocaleTimeString()}
                  </Text> */}
                  {/* 
                  <Button title="Pick Date" onPress={showDatePicker} />
                  <Button title="Pick Time" onPress={showTimePicker} /> */}

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      display="default"
                      onChange={onChange}
                      onTouchCancel={() => setShow(false)} // Optional, in case you need to close on cancel
                    />
                  )}
                  <View style={styles.modalbuttonContainer}>
                    <Pressable
                      style={styles.modalbutton1}
                      onPress={handlecreate}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        CREATE
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.modalbutton2]}
                      onPress={() => setDialogBoxVisible(false)}>
                      <Text
                        style={{color: 'red', fontSize: 12, fontWeight: '700'}}>
                        CANCEL
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              {/* <View style={styles.modalContainer}> */}

              {/* </View> */}
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 10,
        }}>
         <Tooltip
          // style={{width: 40}}
          animated={true}
          // arrowSize={{width: 16, height: 8}}
          backgroundColor="rgba(0,0,0,0.5)"
          isVisible={showTooltip1}
          content={
            <Text style={{color: '#000', fontSize: 12}}>
              Click here to create a new group
            </Text>
          }
          placement="top"
          onClose={async () => {
            setShowTooltip1(false);
          }}>
        <TouchableOpacity onPress={onpressContinue}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../../../assets/images/add.png')}></Image>
        </TouchableOpacity>
        </Tooltip>
      </View>
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    elevation: 5,
    // transform: [{ translateX: -(width * 0.45) }, { translateY: -90 }],
    height: 'auto',
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  modalbutton: {
    width: '40%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  modaltext: {
    color: '#fff',
  },
  modalContainer: {
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#800000',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
    borderRadius: 5,
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  modalbutton1: {
    width: '40%',
    height: 45,
    backgroundColor: '#800000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 70,
    marginBottom: 10,
    alignContent: 'center',
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#b3b3b3',
    borderBottomColor: '#800000',
    borderBottomWidth: 1,
  },
  icon: {
    backgroundColor: '#4D5156',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  ctime: {
    opacity: 0.5,
    color: '#000',
    fontSize: 9,
  },
  cusername: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  cmessage: {
    fontSize: 10,
    opacity: 0.7,
    color: '#777',
  },
});
