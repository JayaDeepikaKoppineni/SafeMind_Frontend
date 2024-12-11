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
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const HowitWorks = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');

  const handleRigister = () => {
    navigation.navigate('Register');
  };
  const handleLoginpress = () => {
    navigation.navigate('Login');
  };
  const data=[
    {id:1,
      name:'Meditation'
    },
    {id:2,
      name:'Quick Stretch'
    },
    {id:3,
      name:'Pomodoro Timer'
    },
    {id:4,
      name:'Positive Affirmations'
    },
   
  ]

  const renderItem=({item})=>{
    return(
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
       <Image style={{width:10,height:10}} source={require('../../assets/images/green_c.png')}></Image>
        <Text style={{color:'#000'}}>{' '}{item.name}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{flex: 1}}>
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
                  source={require('../../assets/images/back.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>

              <Text style={{fontSize: 12, fontWeight: '800', color: '#000'}}>
                {' '}
                How It Works!
              </Text>
            </View>

            <TouchableOpacity >
              {/* <Text
                style={{
                  color: '#000',
                  textDecorationLine: 'underline',
                  fontSize: 15,
                }}>
                Login ?
              </Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop: 15,borderBottomColor:'#ccc',borderBottomWidth:1}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Anonymous Feedback
          </Text>

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: width * 0.95,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{width: width * 0.5}}>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#000',
                    fontWeight: '600',
                    textAlign: 'justify',
                  }}>
                  {' '}
                  Feedback that cannot be traced back to an individual. It's
                  particularly important for HR and People functions in the
                  workplace because it means that your people can provide
                  feedback without fear of the consequences. Rosanna Bull.3
                </Text>
              </View>
              <View>
                <Image
                  style={{width: width * 0.4, height: 150}}
                  source={require('../../assets/images/H_side.png')}></Image>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: 15,borderBottomColor:'#ccc',borderBottomWidth:1}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Peer-to-peer interaction
          </Text>

          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: width * 0.95,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Image
                  style={{width: width * 0.4, height: 150}}
                  source={require('../../assets/images/peer_peer1.png')}></Image>
              </View>
              <View style={{width: width * 0.5}}>
                <Text
                  style={{
                    fontSize: 11,
                    color: '#000',
                    fontWeight: '600',
                    textAlign: 'justify',
                  }}>
                  Peer-to-peer interaction is a collaborative approach where
                  participants share a resource base and work together on a
                  project or activity.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Stress Management Tools
          </Text>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: width * 0.95,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',

              }}>
              <View style={{width: width * 0.5,marginTop:10}}>
              <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            
            
            />
              </View>
              <View>
                <Image
                  style={{width: width * 0.4, height: 150}}
                  source={require('../../assets/images/stree_m.png')}></Image>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowitWorks;

const styles = StyleSheet.create({});
