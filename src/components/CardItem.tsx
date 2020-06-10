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
import Icon from 'react-native-vector-icons/FontAwesome';

const CardItem = ({
  actions,
  description,
  image,
  name,
  onPressDislike,
  onPressLike,
  onPressFav,
  status,
}: any) => {
  const [loading, setLoading] = useState(true);

  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth - 80,
      height: 350,
      margin: 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: 15,
      paddingBottom: 7,
      color: '#363636',
      fontSize: 30,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image
        source={{
          uri: image,
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
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.button} onPress={() => onPressLike()}>
            <Text style={styles.like}>
              <Icon name="heart" size={40} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressFav()}>
            <Text style={styles.star}>
              <Icon name="star" size={50} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressDislike()}>
            <Text style={styles.dislike}>
              <Icon name="times" size={40} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
