import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import MainScreen from './screens/MainScreen';
import COLORS from './colors';
import MapScreen from './screens/MapScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EntryScreen from './screens/auth/EntryScreen';

Icon.loadFont();

const Tab = createBottomTabNavigator();
const Splash = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //auth().signOut();
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: COLORS.black,
            inactiveTintColor: COLORS.black,
            style: {
              backgroundColor: COLORS.background,
              paddingBottom: 16,
              borderTopWidth: 0,
            },
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={MainScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      ) : (
        <Splash.Navigator screenOptions={{headerShown: false}}>
          <Splash.Screen name="Entry" component={EntryScreen} />
        </Splash.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
