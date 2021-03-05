import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import MainScreen from './screens/MainScreen';
import COLORS from './colors';
import MapScreen from './screens/MapScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EntryScreen from './screens/auth/EntryScreen';
import VaccineVerificationScreen from './screens/verification/VaccineVerificationScreen';
import IdentityVerificationScreen from './screens/verification/IdenityVerificationScreen';
import PersonalInformationScreen from './screens/verification/PersonalInformationScreen';
import FaceVerificationScreen from './screens/verification/FaceVerificationScreen';
import store from './store';

Icon.loadFont();

const Tab = createBottomTabNavigator();
const Auth = createStackNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return (
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
  );
}

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
    <Provider store={store}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={TabNavigation} />
            <Stack.Screen
              name="VaccineVerification"
              component={VaccineVerificationScreen}
            />
            <Stack.Screen
              name="IdentityVerification"
              component={IdentityVerificationScreen}
            />
            <Stack.Screen
              name="PersonalInformation"
              component={PersonalInformationScreen}
            />
            <Stack.Screen
              name="FaceVerification"
              component={FaceVerificationScreen}
            />
          </Stack.Navigator>
        ) : (
          <Auth.Navigator screenOptions={{headerShown: false}}>
            <Auth.Screen name="Entry" component={EntryScreen} />
          </Auth.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
