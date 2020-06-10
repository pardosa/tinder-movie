import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import {IMovie} from './Home';
import CardList from '../components/CardList';

const Movies = ({navigation}: any) => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const readfromDB = () => {
    setLoading(true);
    let datas: IMovie[] = [];
    const ref = firebase.database().ref('movies/');
    ref.on(
      'value',
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // childData will be the actual contents of the child
          let mov = JSON.parse(JSON.stringify(childSnapshot.val()));
          datas.push(mov);
        });
        setMovieList(datas);
        setLoading(false);
      },
      function (errorObject: any) {
        console.log('The read failed: ' + errorObject.code);
      },
    );
  };

  useEffect(() => {
    readfromDB();
  }, [movieList.length === 0]);

  return (
    <ImageBackground source={require('../images/bg.png')} style={styles.bg}>
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.icon}>
              <Icon name="heart" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Movies</Text>
          <TouchableOpacity>
            <Text style={styles.icon}>
              <Icon name="bars" />
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>
        ) : movieList.length > 0 ? (
          <FlatList
            numColumns={2}
            data={movieList}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity>
                <CardList item={item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}>
            <Text style={styles.title}>No Movies</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Movies;
