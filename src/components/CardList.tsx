import React, {useState} from 'react';
import styles from '../assets/styles';

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const CardList = (item: any) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(item.item);

  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth / 2 - 30,
      height: 170,
      margin: 0,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image
        source={{
          uri: movie.image,
        }}
        style={imageStyle}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      ) : null}

      {/* NAME */}
      <Text style={styles.titleCardItem}>{movie.title}</Text>

      {/* DESCRIPTION */}
      {movie.description && (
        <Text style={styles.descriptionCardItem}>{movie.description}</Text>
      )}

      {/* STATUS */}
      {/* {movie.action && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon
              name={
                movie.action === 'favourite'
                  ? 'star'
                  : movie.action === 'liked'
                  ? 'heart'
                  : 'times'
              }
            />
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default CardList;
