import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const CarouselCardItem = ({item, index}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  return (
    <View style={styles.container} >
      <Image source={{uri: item.imgUrl}} style={styles.image} />
      <View
        style={{flexDirection: 'column', overflow: 'hidden', marginLeft: 10,width: width * 0.45,}}>
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,

    flexDirection: 'row',

    overflow: 'hidden',
    height: 150,
    marginTop: 10,
    borderRightColor:'#ccc',
    borderWidth:1
  },
  image: {
    width: width * 0.45,
    // height: 100,
    // objectFit:
  },
  header: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  body: {
    color: '#222',
    fontSize: 10,
    
  },
});

export default CarouselCardItem;
