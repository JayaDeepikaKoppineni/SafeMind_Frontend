import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import logo from '../../../assets/images/profile.png';


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const Profile = ({route,navigation}) => {
  var height = Dimensions.get('window').height;
  var width = Dimensions.get('window').width;

  const [country,setcountry]=useState('INR')

  const {handleLogout} = route.params;
  const [agree, setAgree] = useState(false);

  const [isOn, setIsOn] = useState(false);

  const handleToggle = async isOn => {
    setIsOn(isOn);
    console.log('Switch changed to:', isOn);
  };

  const logout = () => {
    handleLogout();
  };

  const HandleOption=(text)=>{
    console.log(text,"text")
    if(text=="Logout"){
      logout()
    }else if(text=="Pomodoro Timer"){
      navigation.navigate('Pomodoro')
    }else if(text=="All Groups"){
      navigation.navigate('Groups')
    }
  }
  const edit=()=>{
    navigation.navigate('EditProfile')
  }
  const item = [
    {image: require('../../../assets/images/group_plus.png'), id: 1, text: 'All Groups'},
    {
      image: require('../../../assets/images/timer.png'),
      id: 2,
      text: 'Pomodoro Timer',
    },
    {image: require('../../../assets/images/medititon.png'), id: 3, text: 'Meditation'},
    {
      image: require('../../../assets/images/stretch.png'),
      id: 4,
      text: 'Quick Stretch',
    },
 
    {
      image: require('../../../assets/images/affirmation.png'),
      id: 5,
      text: 'Positive Affirmations',
    },
    {
      image: require('../../../assets/images/power-off.png'),
      id: 6,
      text: 'Logout',
    },

  ];
 
  const renderItem = ({item}) => (
    <View>
      <View>
        <TouchableOpacity onPress={()=>HandleOption(item.text)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#bfbfbf',
              marginTop: 10,
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image style={styles.sideimg} source={item.image}></Image>
              <Text style={styles.texti}>{item.text}</Text>
            </View>
            <View>
              <Image
                style={styles.sideimg1}
                source={require('../../../assets/images/next.png')}></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );



  const wallet=()=>{
    navigation.navigate('Wallet')
  }

  return (

    <SafeAreaView style={styles.container}>
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
             
              <TouchableOpacity>
                {/* <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/images/setting.png')}></Image> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
       
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View style={{width: width * 0.97,   borderWidth: 1,
          borderColor: '#000', borderRadius: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              marginTop: 20,
              position: 'relative',
            }}>
            <View style={styles.mainprofile}>
              <Image
                style={styles.profileimage}
                source={require('../../../assets/images/profile.png')}></Image>
              <View style={{marginLeft: 10}}>
                <Text style={styles.para}>User123400</Text>
                <Text style={styles.para}>XXXX937421</Text>
                <Text style={styles.para}>Koppinenijayadeepika@gmail.com</Text>
              </View>
            </View>

            {/* <Text style={{color:'#fff'}}>Edit</Text> */}
            <View style={{position: 'absolute', top: 0, right: 0}}>
              <TouchableOpacity onPress={edit}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../../assets/images/edit.png')}></Image>
                <Text style={{color: '#fff'}}>Edit</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-around',
              marginTop: 20,
              marginBottom: 15,
            }}>
            <View>
              <Text style={styles.para}>Total FeedBacks</Text>
              <Text style={styles.para1}>0</Text>
            </View>
            <View>
              <Text style={styles.para}>Totals Groups</Text>
              <Text style={styles.para1}>0</Text>
            </View>
           
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View style={{width: width * 0.95}}>
          <View style={styles.sidebar} />
    
          <ScrollView style={styles.content} indicatorStyle="white">
            <View>
              <FlatList
                data={item}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                indicatorStyle="white" // Scroll indicator for FlatList
                horizontal={false}
                contentContainerStyle={{paddingBottom: height * 0.3}}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
  img: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft:10
  },
  iconText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  mainprofile: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileimage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    padding: 5,
    borderWidth: 3,
    borderColor: '#000',
  },

  para: {
    color: '#000',
    fontSize: 10,
  },
  para1: {
    color: '#000',
    fontSize: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 13,
    textAlign: 'center',
    marginTop: 10,
  },

  image: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  sidebar: {
    width: 80, // Set sidebar width
    backgroundColor: 'red', // Sidebar color (can be customized)
  },
  content: {
    // backgroundColor: '#fff',
  },
  sideimg: {
    width: 30,
    height:30,
    // backgroundColor: '#fff',
 
    padding: 10,
  },

  texti: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 14,
  },
  sideimg1: {
    width: width * 0.07,
    height: height * 0.03,
  },
});
