import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ProgressSteps,
  ProgressStep,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Switch,
  SafeAreaView,
  Pressable,
  TextInput,
  Button,
  ImageBackground,
  Alert,
  Modal,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import io from 'socket.io-client';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {
  BASEURL,
  URL,
  deleteGroup,
  reg_peronality_chart,
} from '../../../Api/Api';
const screenWidth = Dimensions.get('window').width;
import RBSheet from 'react-native-raw-bottom-sheet';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const socket = io(URL);

const Chatting = ({navigation, route}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const scrollViewRef = useRef();
  const refRBSheet = useRef();
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const showgraph = () => {
    refRBSheet.current.open();
  };
  const userdata = route?.params?.userKey;
  const sender = route?.params?.reciverKey;

  const group_number = route?.params?.userKey?.group_number;

  const updateMessageList = newMessage => {
    console.log(newMessage, 'newmessage!!!!!!!!!!!!!!!');

    if (newMessage.group_number == route.params.userKey.group_number) {
      console.log('ifffffffffffffffffffff');
      setMessages(prevMessages => {
        console.log(prevMessages, 'premessages');
        const updatedMessages = [...prevMessages, newMessage];
        // console.log('State after update:', updatedMessages);
        return updatedMessages;
      });
    } else {
      console.log('elseeeeeeee');
      setMessages(prevMessages => {
        console.log(prevMessages, 'premessages');
        const updatedMessages = [...prevMessages];
        // console.log('State after update:', updatedMessages);
        return updatedMessages;
      });
    }
  };

  const scrollToBottom = () => {
    try {
      scrollViewRef.current.scrollToEnd({animated: true});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Fetch initial messages between sender and receiver
    console.log(userdata, 'userdata');
    socket.emit('getMessagesGroup', {group_number});

    socket.on('allMessagesGroup', allMessages => {
      console.log(allMessages, '---------------');
      setMessages(allMessages);
    });

    socket.on('receiveMessageGroup', message => {
      console.log(message, 'receiveMessageGroup');
      updateMessageList(message); // Update message list on receiving a new message
    });

    setTimeout(() => {
      scrollToBottom();
    }, 3000);

    return () => {
      socket.off('allMessagesGroup');
      socket.off('receiveMessageGroup');
    };
  }, [group_number]);

  const renderChatItem = ({item}) => {
    const isSender = item.reciverid == sender;

    const formattedDate = formatDateString(item.created_at); // Assuming 'date' is the property containing the date string

    return (
      <View
        style={{
          alignSelf: isSender ? 'flex-end' : 'flex-start',
          margin: 5,
          flex: 1,
          alignItems: isSender ? 'flex-end' : 'flex-start',
          justifyContent: isSender ? 'flex-end' : 'flex-start',
        }}>
        <View>
          <View>
            <Text style={{color: '#000', fontSize: 10}}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: isSender ? '#DCF8C6' : '#FFFFFF',
                padding: 10,
                borderRadius: 10,
                maxWidth: '100%',
                marginBottom: 10, // Limit message width
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text style={{color: '#777', fontSize: 8}}>{formattedDate}</Text>
              <Text style={{color: '#000'}}>{item.message}</Text>
            </View>
            {isSender && (
              <>
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../../../assets/images/doubletick.png')}></Image>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const sendbtn = async () => {
    const session = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data = JSON.parse(session).data;
    const client_secret_token = JSON.parse(session).acesstoken;

    console.log(client_secret_data, 'client_secret_data');
    const responseData = JSON.parse(client_secret_data);

    const name = responseData[0].name;
    const reciverid = route.params.reciverKey;

    console.log(route.params.reciverKey, 'id');
    console.log(newMessage, 'newmessage');

    const message = newMessage;
    if (newMessage) {
      socket.emit('sendMessageGroup', {
        group_number,
        reciverid,
        message,
        name,
      });
      setNewMessage('');
    } else {
      console.log('enter message');
    }
  };

  const formatDateString = dateString => {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const hours = `0${date.getHours()}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      const formattedTime = `${hours}:${minutes}`;

      return `${formattedDate} - ${formattedTime}`;
    } else {
      const date = new Date();
      // const date = new Date(dateString);
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const hours = `0${date.getHours()}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      const formattedTime = `${hours}:${minutes}`;

      return `${formattedDate} - ${formattedTime}`;
    }
  };

  const deleteicon_group = async () => {
    const session = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data = JSON.parse(session).data;
    const client_secret_token = JSON.parse(session).acesstoken;

    console.log(client_secret_data, 'client_secret_data');
    const responseData = JSON.parse(client_secret_data);

    console.log('delete group');
    const groupdata = route.params.userKey;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: groupdata.name,
      }),
    };
    console.log(requestOptions.body, 'body');
    try {
      var match_res = await fetch(
        `${deleteGroup}/${groupdata.id}`,
        requestOptions,
      );
      var res = await match_res.json();

      if (res.result == 'success') {
        try {
          Alert.alert(
            'Hemo Link',
            'Group Deleted Successfully . \n',
            [
              {
                text: 'OK',
                onPress: () => console.log(''),
              },
            ],
            {cancelable: true},
          );
        } catch {}

        navigation.navigate('Home');
      } else {
        showToast('error', res.Message, 'top');
        try {
          Alert.alert(
            'Hemo Link',
            'Uh oh. 😕\nSomething went wrong, please try again. \nClick OK',
            [
              {
                text: 'OK',
                onPress: () => console.log(''),
              },
            ],
            {cancelable: true},
          );
        } catch {}
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e, 'catch match');
      try {
        Alert.alert(
          'Hemo Link',
          'Uh oh. 😕\nSomething went wrong, please try again. \nClick OK',
          [
            {
              text: 'OK',
              onPress: () => console.log(''),
            },
          ],
          {cancelable: true},
        );
      } catch {}
      navigation.navigate('Home');
    }
  };
  const [personalityCounts, setPersonalityCounts] = useState({});

  useEffect(() => {
      async function fetchGroups() {
      const session = await EncryptedStorage.getItem('secrets_login_safeminds');
      const client_secret_data = JSON.parse(session).data;
      const client_secret_token = JSON.parse(session).acesstoken;

      console.log(client_secret_data, 'client_secret_data');
      const responseData = JSON.parse(client_secret_data);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          university: responseData[0].university,
        }),
      };
      try {
        var match_res = await fetch(reg_peronality_chart, requestOptions);
        var response = await match_res.json();
        console.log(response, 'response');
        if (response.result == 'success') {
          const counts = countPersonalityTypes(response.data);
          setPersonalityCounts(counts);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchGroups();
  }, []);

  const countPersonalityTypes = data => {
    return data.reduce((acc, user) => {
      const type = user.personal_type;
      acc[type] = acc[type] ? acc[type] + 1 : 1;
      return acc;
    }, {});
  };

  // Use useEffect to set the personality counts once when the component loads

  // Prepare data for the bar chart
  // const labels = Object.keys(personalityCounts);
  // const dataValues = Object.values(personalityCounts);
  const labels = Object.keys(personalityCounts).map(
    type => `${type}\n(${personalityCounts[type]})`,
  );
  const dataValues = Object.values(personalityCounts);

  return (
    <MenuProvider>
      <ImageBackground
        source={require('../../../../assets/images/plane_line.jpg')}
        resizeMode="stretch"
        style={{
          height: '100%',
          width: '100%',

          alignItems: 'center',
          flex: 1,
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
            <View style={{width: width * 1, marginTop: 10, marginBottom: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    style={{width: 30, height: 30, marginLeft: 10}}
                    source={require('../../../../assets/images/back_button.png')}></Image>
                </TouchableOpacity>
                <Text style={{color: '#000', fontSize: 12, fontWeight: '800'}}>
                  Chat
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {userdata.userid == route.params.reciverKey && (
                    <>
                      <View>
                        <TouchableOpacity onPress={showgraph}>
                          <View>
                            <Image
                              style={{width: 30, height: 30, marginRight: 30}}
                              source={require('../../../../assets/images/diagram.png')}></Image>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  <View>
                    {userdata.userid == route.params.reciverKey && (
                      <>
                        <Menu style={{}}>
                          <MenuTrigger>
                            <Image
                              style={{width: 30, height: 30, marginRight: 10}}
                              source={require('../../../../assets/images/dots.png')}></Image>
                          </MenuTrigger>
                          <MenuOptions style={{marginTop: 10}}>
                            <MenuOption></MenuOption>
                            <MenuOption onSelect={deleteicon_group}>
                              <Text
                                style={{
                                  color: 'red',
                                  marginLeft: 10,
                                  padding: 2,
                                }}>
                                Delete
                              </Text>
                            </MenuOption>
                            <MenuOption></MenuOption>
                          </MenuOptions>
                        </Menu>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          {messages && (
            <>
              <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }>
                <View>
                  {console.log(userdata, 'userdata')}
                  <Text
                    style={{color: '#000', fontSize: 9, textAlign: 'center'}}>
                    {userdata?.groupd_name}
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 9, textAlign: 'center'}}>
                    Only Admin Can Delete This Group
                  </Text>
                </View>
                <FlatList
                  data={messages}
                  renderItem={renderChatItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ScrollView>
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
              marginLeft: 10,
            }}>
            <View
              style={{
                width: width * 0.95,
                height: height * 0.065,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#ccc',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19,
              }}>
              <TextInput
                value={newMessage}
                onChangeText={text => setNewMessage(text)}
                placeholder="Type a message..."
                style={{flex: 1, color: '#000'}}
                placeholderTextColor="#000"
              />
              <TouchableOpacity onPress={sendbtn}>
                <View
                  style={{
                    backgroundColor: '#f2f2f2',
                    width: 75,
                    height: 45,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'blue', fontWeight: '600'}}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
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
            <View style={{alignItems: 'center'}}>
              <View style={{width: width * 0.95}}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    marginBottom: 20,
                    color: '#000',
                  }}>
                  Personality Type
                </Text>
                <View>
                  <BarChart
                    data={{
                      labels: labels, // Each label is now "Type\n(Count)"
                      datasets: [
                        {
                          data: dataValues,
                        },
                      ],
                    }}
                    width={screenWidth } // Adjust width as needed
                    height={height *0.4} // Height of the chart
                    yAxisLabel="" // Optional label for Y-axis values
                    chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForLabels: {
            fontSize:8, // Set label font size to 10
          },
                    }}
                    verticalLabelRotation={0}
                  />
                </View>
              </View>
            </View>
          </RBSheet>
          {/* 
          <View>
            <Modal
              animationType="slide"
              transparent
              visible={dialogBoxVisible}
              presentationStyle="overFullScreen">
              <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                  <View style={{alignItems: 'center'}}>
                    <View style={{width: width * 0.9}}>
                      <Text
                        style={{
                          fontSize: 18,
                          textAlign: 'center',
                          marginBottom: 20,
                        }}>
                        Personality Type Distribution
                      </Text>
                      <BarChart
                        data={{
                          labels: labels,
                          datasets: [
                            {
                              data: dataValues,
                            },
                          ],
                        }}
                        width={screenWidth - 40} // Adjust width as needed
                        height={220} // Height of the chart
                        yAxisLabel="" // Optional label for Y-axis values
                        chartConfig={{
                          backgroundColor: '#1cc910',
                          backgroundGradientFrom: '#eff3ff',
                          backgroundGradientTo: '#efefef',
                          decimalPlaces: 0,
                          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                          labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                          style: {
                            borderRadius: 16,
                          },
                        }}
                        verticalLabelRotation={30}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View> */}
        </SafeAreaView>
      </ImageBackground>
    </MenuProvider>
  );
};

export default Chatting;

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
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});
