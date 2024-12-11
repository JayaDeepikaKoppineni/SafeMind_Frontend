import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
// import data from './data'
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const data = [
  {
    title: '5 Visualization Techniques to Add to Your Meditation Practice',
    body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
    link:'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
    imgUrl: require('../../assets/images/med1.jpg'),
  },
  
  {
    title: 'Exploring the Benefits of Meditation for Anxietys',
    body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
    link:'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
    imgUrl: require('../../assets/images/med2.jpg'),
  },
  {
    title: 'How Meditation Benefits Your Mind and Body',
    body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
    link:'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
    imgUrl: require('../../assets/images/med3.jpg'),
  },
  {
    title: 'What Is Breathwork Meditation?',
    body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
    link:'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
    imgUrl: require('../../assets/images/med4.jpg'),
  },


];

const Medtation = () => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{width: width * 0.95}}>
      {data &&(
{/* 
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={width * 0.95}
          itemWidth={width * 0.95}
          onSnapToItem={index => setIndex(index)}
          useScrollView={true}
          autoplay={true}
          loop={true}

        /> */}
      )}
      
     
      </View>
    </View>
  );
};

export default Medtation;

const styles = StyleSheet.create({});
