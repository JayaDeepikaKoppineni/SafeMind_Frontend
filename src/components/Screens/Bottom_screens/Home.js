import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import uuid from 'react-native-uuid'; // For generating anonymous IDs
import RBSheet from 'react-native-raw-bottom-sheet';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

import React, {useEffect, useRef, useState} from 'react';
import {Group_get_all, safemind_post, safemind_post_all} from '../../Api/Api';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const Home = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [message, setmessage] = useState('');
  const refRBSheet = useRef();
  const [showTooltip1, setShowTooltip1] = useState(false);

  React.useEffect(() => {
    // Check if tooltips have been shown before
    AsyncStorage.getItem('tooltipsShownHome').then(value => {
      if (!value) {
        // First time user, show tooltips
        setShowTooltip1(true);
        AsyncStorage.setItem('tooltipsShownHome', 'true');
      }
    });
  }, []);

  const [getgroups, setgetgroups] = useState(null);
  const [post,setpost]=useState(null)
  async function fetchGroupspost() {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      var match_res = await fetch(safemind_post_all, requestOptions);
      var response = await match_res.json();
      console.log(response, 'response----------');
      if (response.result == 'success') {
        setpost(response.data);
      } else {
        console.log('NO');
      }
    } catch (e) {
      console.log(e);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
     
      fetchGroupspost();

    }, []),
  )

  useFocusEffect(
    React.useCallback(() => {
      async function fetchGroups() {
        const session = await EncryptedStorage.getItem(
          'secrets_login_safeminds',
        );
        const client_secret_data = JSON.parse(session).data;
        const client_secret_token = JSON.parse(session).acesstoken;

        console.log(client_secret_data, 'client_secret_data');
        const responseData = JSON.parse(client_secret_data);

        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        try {
          var match_res = await fetch(Group_get_all, requestOptions);
          var response = await match_res.json();
          console.log(response, 'response----------');
          if (response.result == 'success') {
            setgetgroups(response.data);
          } else {
            console.log('NO');
          }
        } catch (e) {
          console.log(e);
        }
      }
      fetchGroups();
    }, []),
  );

  const generateUserId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit ID
  };
  const [posts, setPosts] = useState([
    {
      id: '1',
      content:
        'XYZ Company has great work-life balance, but could improve management transparency.',
      category: 'Company',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '2',
      content:
        'ABC High School provides excellent education but needs to update its facilities.',
      category: 'School',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '3',
      content:
        'John Doe (Manager at ABC Ltd) is supportive, but micromanages the team.',
      category: 'Manager',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '4',
      content:
        'DEF University has an amazing campus, but the administration is slow to respond to student concerns.',
      category: 'University',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '5',
      content:
        'GHI Corporation offers excellent career growth opportunities, but their benefits package could be better.',
      category: 'Company',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '6',
      content:
        'LMN School has an inclusive environment, but more extracurricular activities would be beneficial.',
      category: 'School',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '7',
      content:
        'Sarah Lee (Manager at XYZ Inc) fosters innovation, but often sets unrealistic deadlines.',
      category: 'Manager',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '8',
      content:
        'PQR College has a fantastic engineering department, but housing options for students are limited.',
      category: 'University',
      likes: 0,
      likedByUser: false,
    },
  ]);
  const userId = generateUserId(); // Generates a 6-digit random ID
  const [newPostContent, setNewPostContent] = useState('');

  // const userId = uuid.v4(); // This can be replaced by your logged-in user ID if available
  const toggleLike = postId => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          // Toggle the like state
          const likedByUser = !post.likedByUser;
          const likes = likedByUser ? post.likes + 1 : post.likes - 1;

          return {
            ...post,
            likes: likes > 0 ? likes : 0, // Ensure likes don't go below 0
            likedByUser,
          };
        }
        return post;
      });
    });
  };

  const addNewPost = async() => {
    if (newPostContent.trim() === '') {
      Alert.alert('Error', 'Please enter some feedback before submitting.');
      return;
    }

    refRBSheet.current.close();
    // Create a new post object

    const session = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data = JSON.parse(session).data;
    const client_secret_token = JSON.parse(session).acesstoken;

    console.log(client_secret_data, 'client_secret_data');
    const responseData = JSON.parse(client_secret_data);

    const data=new Date().toLocaleString();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: newPostContent,
        userid:responseData[0].name,
        currentstamp:data,
        likes:"0"
      }),
    };
    try {
      var match_res = await fetch(safemind_post, requestOptions);
      var response = await match_res.json();
      console.log(response, 'response');
      if (response.result == 'success') {
        alert('Post Added');
        setNewPostContent('');
        fetchGroupspost()
      } 
    } catch (e) {
      console.log(e);
    }
    // const newPost = {
    //   id: (posts.length + 1).toString(), // Incrementing the ID (you can use a more robust method in production)
    //   content: newPostContent,
    //   category: 'General', // You can enhance this by letting users select categories
    //   likes: 0,
    //   likedByUser: false,
    // };

    // // Add the new post to the existing list of posts
    // setPosts([newPost, ...posts]);
    // alert('Post Added');
    // // Clear the TextInput
    // setNewPostContent('');
  };

  // Render each post item
  const renderItem = ({item}) => (
    <View style={{alignItems: 'center'}}>
      <View style={{width: width * 0.95}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/profile.png')}></Image>
            <View style={{marginLeft: 10}}>
              <Text style={styles.t_text}>User{item.userid}</Text>
              <Text style={styles.t2_text}>{item.currentstamp}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/dots.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          {/* <Text style={styles.postCategory}>Category: {item.category}</Text> */}
          <Text style={styles.postContent}>{item.post}</Text>
          {/* <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => toggleLike(item.id)}
              style={styles.likeButton}>
           
              
              {item.likes ? (
                <>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/images/like.png')}></Image>
                </>
              ) : (
                <>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/images/dislike.png')}></Image>
                </>
              )}

              <Text
                style={[styles.likeText, item.likedByUser && {color: 'blue'}]}>
                {item.likedByUser ? 'Unlike' : 'Like'} ({item.likes})
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );

  const groupbtn = async item => {
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

  const rendergroups = ({item}) => {
    const truncatedGroupName =
      item.streams.length > 9 ? `${item.streams.slice(0, 9)}...` : item.streams;

    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => groupbtn(item)}
          style={{alignItems: 'center'}}>
          <View
            style={{
              width: 50,

              borderRadius: 10,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',

              // borderRadius: 10,
            }}>
            <View>
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                  backgroundColor: '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'green',
                }}>
                <Image
                  source={require('../../../assets/images/group_icon.png')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
              </View>
              <Text style={{color: '#000', fontSize: 8, fontWeight: '700'}}>
                {truncatedGroupName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#99ff99',

          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <View style={{width: width * 0.95}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/images/safemind_logo.png')}></Image>
              <Text style={{fontSize: 15, fontWeight: '800', color: '#000'}}>
                SafeMind
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginRight: 30}}
                onPress={() => navigation.navigate('Groups')}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/images/group_plus.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/images/bell.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{marginTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <View style={{marginRight: 20}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.navigate('Groups')}>
              <View
                style={{
                  alignItems: 'center',
                  width: 45,
                  height: 45,
                  borderRadius: 10,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../../../assets/images/plus.png')}></Image>
              </View>
              <Text style={{color: '#000', fontSize: 8, fontWeight: '700'}}>
                Create Group
              </Text>
            </TouchableOpacity>
          </View>
          {getgroups && getgroups.length > 0 ? (
            <>
              <FlatList
                data={getgroups}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={rendergroups}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingRight: height * 0.15,
                }}
                //  contentContainerStyle={{paddingBottom: height * 0.15}}
              />
            </>
          ) : (
            <>
              <Text style={{color: '#000', fontSize: 10, fontWeight: '900'}}>
                {'No Groups Found'}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <FlatList
          data={post}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
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
              Click here to post your thought
            </Text>
          }
          placement="top"
          onClose={async () => {
            setShowTooltip1(false);
          }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../assets/images/add.png')}></Image>
          </TouchableOpacity>
        </Tooltip>
      </View>

      <View>
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
              height: '60%',
            },
          }}>
          <SafeAreaView style={{backgroundColor: '#fff', alignItems: 'center'}}>
            <View style={{width: width * 0.9}}>
              <View>
                <View style={{alignItems: 'center'}}>
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
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => refRBSheet.current.close()}>
                          <Image
                            source={require('../../../assets/images/back.png')}
                            style={{width: 30, height: 30}}
                          />
                        </TouchableOpacity>

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '800',
                            color: '#000',
                          }}>
                          {' '}
                          Feedback Post
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 0}}>
                <View
                  style={{
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                    marginTop: 0,
                  }}>
                  <View style={styles.inputContainer}>
                    <Text
                      style={{color: '#000', marginBottom: 20, marginTop: 20}}>
                      Enter Message
                    </Text>
                    <View style={styles.inputView2}>
                      <TextInput
                        style={styles.TextInput2}
                        onChangeText={message => setNewPostContent(message)}
                        placeholder="Enter Message"
                        placeholderTextColor="#8b9cb5"
                        keyboardType="default"
                        // ref={passwordInputRef}
                        // onSubmitEditing={Keyboard.dismiss}
                        multiline
                        underlineColorAndroid="#f000"

                        // value={password}
                      />
                      <View></View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.loginBtn}
                      onPress={addNewPost}>
                      <Text style={styles.loginText}> Send Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom:20,
    marginTop:20
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
  },
  t_text: {
    color: '#000',
    fontSize: 12,
  },
  t2_text: {
    color: 'grey',
    fontSize: 9,
  },
  inputContainer: {
    position: 'relative',
    // width: '100%',
    // marginBottom: 20,
  },
  TextInput2: {
    height: 90,
    flex: 1,
    padding: 10,
    // marginLeft: 10,
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
    borderWidth: 1,
    borderColor: '#000',
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
