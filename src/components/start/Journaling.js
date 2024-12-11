// import React from 'react';
// import {View, StyleSheet, Dimensions} from 'react-native';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItem';
// // import data from './data'
// const {width} = Dimensions.get('window');
// const {height} = Dimensions.get('window');
// const data = [
//   {
//     title: '5 Visualization Techniques to Add to Your Meditation Practice',
//     body: 'Looking to up your meditation game? Try adding a little visualization into the mix.',
//     link:'https://www.healthline.com/health/visualization-meditation?utm_source=ReadNext',
//     imgUrl: require('../../assets/images/med1.jpeg'),
//     id:1
//   },


//   {
//     title: 'Exploring the Benefits of Meditation for Anxietys',
//     body: 'We ll explore the evidence that meditation is a great treatment for anxiety and show you how to get started.',
//     link:'https://www.healthline.com/health/anxiety/meditation-for-anxiety?utm_source=ReadNext',
//     imgUrl: require('../../assets/images/med2.jpeg'),
//     id:2
//   },
//   {
//     title: 'How Meditation Benefits Your Mind and Body',
//     body: 'Meditation is the process of redirecting your thoughts to calm your mind. It may also improve your overall quality of life. This is what the research…',
//     link:'https://www.healthline.com/nutrition/12-benefits-of-meditation?utm_source=ReadNext',
//     imgUrl: require('../../assets/images/med3.jpg'),
//     id:3
//   },
//   {
//     title: 'What Is Breathwork Meditation?',
//     body: 'Breathwork meditation has many mental health benefits and its never too late to learn.',
//     link:'https://www.healthline.com/health/breath-work-meditation?utm_source=ReadNext',
//     imgUrl: require('../../assets/images/med4.jpeg'),
//     id:4
//   },


// ];
// const Journaling = () => {
//     const {width} = Dimensions.get('window');
//     const {height} = Dimensions.get('window');
//     const [index, setIndex] = React.useState(0);
//     const isCarousel = React.useRef(null);

//   return (
//     <View style={{alignItems: 'center'}}>
//     <View style={{width: width * 0.95}}>
//       <Carousel
//         layout="tinder"
//         layoutCardOffset={9}
//         ref={isCarousel}
//         data={data}
//         renderItem={CarouselCardItem}
//         sliderWidth={width * 0.95}
//         itemWidth={width * 0.95}
//         onSnapToItem={index => setIndex(index)}
//         useScrollView={true}
//         autoplay={true}
//         loop={true}

//       />
//       {/* <Pagination
//         dotsLength={data.length}
//         activeDotIndex={index}
//         carouselRef={isCarousel}
//         dotStyle={{
//           width: 10,
//           height: 10,
//           borderRadius: 5,
//           marginHorizontal: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.92)',
//         }}
//         inactiveDotOpacity={0.4}
//         inactiveDotScale={0.6}
//         tappableDots={true}
//       /> */}
//     </View>
//   </View>
//   )
// }

// export default Journaling

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Journaling = () => {
  return (
    <View>
      <Text>Journaling</Text>
    </View>
  )
}

export default Journaling

const styles = StyleSheet.create({})