import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Genres = ({genres}) => {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={genre} style={styles.genre}>
            <Text style={styles.genreText} numberOfLines={2}>
              {genre}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  genres: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#fff',
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    color: '#fff',
    fontSize: 9,
    opacity: 0.4,
  },
});

export default Genres;
