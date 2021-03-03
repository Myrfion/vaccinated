import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MainScreen from './screens/MainScreen';
import COLORS from './colors';
import MapScreen from './screens/MapScreen';

Icon.loadFont();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

export default App;
