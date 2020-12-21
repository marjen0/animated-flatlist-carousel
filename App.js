import React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Platform,
} from 'react-native';

import {getMovies} from './api';
import Genres from './components/Genres';

import Loader from './components/Loader';
import Backdrop from './components/Backdrop';

const {width} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.contentContainer}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={[styles.cardContainer, {transform: [{translateY}]}]}>
                <Image source={{uri: item.poster}} style={styles.posterImage} />
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>

                <Genres genres={item.genres} />
                <Text style={styles.description} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: SPACING,
    alignItems: 'center',
  },
  contentContainer: {alignItems: 'center'},
  title: {
    fontSize: 24,
    color: '#fff',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 25,
    margin: 0,
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: '#fff',
  },
});

export default App;
