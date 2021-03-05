import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Marker} from 'react-native-maps';
import COLORS from '../colors';

MapScreen.propTypes = {};

const markers = [
  {
    latitude: 43.6872144,
    longitude: -79.3284513,
    title: 'Toronto east health network',
  },
  {
    latitude: 43.7129414,
    longitude: -79.2873624,
    title: 'Unity Health Toronto',
  },
  {
    latitude: 43.7806807,
    longitude: -79.207066,
    title: 'Scarborough Health Network - Centenary hospital',
  },
  {
    latitude: 43.5908113,
    longitude: -79.6679378,
    title: 'Trillium Health Partners',
  },
  {
    latitude: 43.2512827,
    longitude: -79.8951816,
    title: 'Hamilton General Hospital',
  },
];

function MapScreen(props) {
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <Text style={styles.title}>Map</Text>
        <MapView
          initialRegion={{
            latitude: 43.75708,
            longitude: -79.42693,
            latitudeDelta: 0.522,
            longitudeDelta: 0.5421,
          }}
          style={{width: 100 + '%', height: 100 + '%'}}>
          {markers.map((marker, key) => {
            return (
              <Marker coordinate={marker} title={marker.title} key={key} />
            );
          })}
        </MapView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  title: {
    marginTop: 32,
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default MapScreen;
