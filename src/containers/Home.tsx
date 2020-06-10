import React, {useState, useRef} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import styles from '../assets/styles';
import CardItem from '../components/CardItem';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

export interface IMovie {
  id: string;
  title: string;
  image: string;
  description: string;
  action?: string;
}

const Home = ({navigation}: any) => {
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(true);

  const cardRef = useRef<any>(null);

  const fetchMovies = (title: string, replace: boolean) => {
    console.log('fetchMovies with title: ' + title);
    // setLoading(true);
    axios
      .get('https://imdb-api.com/API/SearchMovie/{API_KEY}/' + title)
      .then((res) => {
        setLoading(false);
        let newList = [];
        replace
          ? (newList = res.data.results)
          : (newList = [...movieList, ...res.data.results]);
        setMovieList(newList);
      })
      .catch((error) => {
        console.warn('Error to fetchMovies :' + error);
        setLoading(false);
      });
  };

  var config = {
    databaseURL: 'https://tinder-movie.firebaseio.com',
    projectId: 'tinder-movie',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const saveToDB = (data: IMovie) => {
    let id = null;

    var ref = firebase.database();
    ref
      .ref('movies/')
      .orderByChild('id')
      .equalTo(data.id)
      .on('child_added', function (snapshot) {
        id = snapshot.key;
        console.log(id);
      });

    id === null
      ? ref
          .ref('movies/')
          .push(data)
          .then((data) => {
            //success callback
            console.log('data saved: ');
          })
          .catch((error) => {
            //error callback
            console.log('error saving: ', error);
          })
      : ref
          .ref('movies/' + id)
          .update(data)
          .then((data) => {
            //success callback
            console.log('data updated: ');
          })
          .catch((error) => {
            //error callback
            console.log('error saving: ', error);
          });
  };

  return (
    <ImageBackground source={require('../images/bg.png')} style={styles.bg}>
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.city}
            onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.cityText}>
              <Icon name="bars" size={20} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filters}
            onPress={() => setFilter(true)}>
            <Text style={styles.filtersText}>
              <Icon name="filter" /> Filters
            </Text>
          </TouchableOpacity>
        </View>

        {filter ? (
          <View style={styles.containerCardItem}>
            <Text>Search Movies</Text>
            <View>
              <TextInput
                placeholder="Movie Title"
                value={title}
                style={{width: '100%'}}
                onChangeText={(val) => setTitle(val)}
              />
            </View>
            <View style={styles.filtersBtn}>
              <Button
                onPress={() => {
                  setFilter(false);
                  fetchMovies(title, true);
                }}
                title="search"
              />
            </View>
          </View>
        ) : loading ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : movieList.length > 0 ? (
          <CardStack
            ref={cardRef}
            loop={false}
            verticalSwipe={true}
            renderNoMoreCards={() => null}
            disableBottomSwipe={true}
            onSwiped={(index) => {
              if (movieList.length - 2 === index) {
                fetchMovies(title, false);
              }
            }}
            onSwipedLeft={(index) =>
              saveToDB({...movieList[index], action: 'liked'})
            }
            onSwipedTop={(index) =>
              saveToDB({...movieList[index], action: 'favourite'})
            }
            onSwipedRight={(index) =>
              saveToDB({...movieList[index], action: 'not liked'})
            }>
            {movieList.map((item, index) => (
              <Card key={index}>
                <CardItem
                  image={item.image}
                  name={item.title}
                  description={item.description}
                  onPressLike={() => {
                    if (cardRef.current && cardRef.current !== null)
                      cardRef.current.swipeRight();
                  }}
                  onPressDislike={() => {
                    if (cardRef.current && cardRef.current !== null)
                      cardRef.current.swipeLeft();
                  }}
                  onPressFav={() => {
                    if (cardRef.current && cardRef.current !== null)
                      cardRef.current.swipeTop();
                  }}
                  actions
                />
              </Card>
            ))}
          </CardStack>
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
  //}
};

export default Home;
