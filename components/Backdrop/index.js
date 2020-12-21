import React from 'react';
import {View, FlatList, Animated, Image, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const BACKDROP_HEIGHT = height * 0.65;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

const Backdrop = ({movies, scrollX}) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: 'absolute',
      }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#000']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;
