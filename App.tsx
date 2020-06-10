/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Text, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './src/containers/Home';
import ProfileScreen from './src/containers/Profile';
import MoviesScreen from './src/containers/Movies';
import styles from './src/assets/styles';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

const MenuStacks = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#42f44b',
      }}>
      <Tab.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? '#7444C0' : '#363636';
            return (
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <Icon name="film" />
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? '#7444C0' : '#363636';
            return (
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <Icon name="user" />
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

// const ChatStacks = () => {
//   return (
//     <ChatStack.Navigator>
//       <ChatStack.Screen name="Movie" component={MessageScreen} />
//       <ChatStack.Screen name="MovieDetail" component={ProfileScreen} />
//     </ChatStack.Navigator>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AppStack.Screen name="Home" component={HomeScreen} />
        <AppStack.Screen name="Menu" component={MenuStacks} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
