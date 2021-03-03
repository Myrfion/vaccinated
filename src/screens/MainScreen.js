import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import COLORS from '../colors';
import Card from '../components/Card';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

MainScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

const vaccinated = false;
// <Text style={styles.title}>Hello, Tymur</Text>
function MainScreen(props) {
  const {navigation} = props;

  return (
    <View style={styles.root}>
      <SafeAreaView
        style={[styles.safeAreaView, vaccinated ? {alignItems: 'center'} : {}]}>
        {vaccinated ? (
          <Card
            picture={require('../assets/pfp.jpg')}
            name="Tymur Levtsun"
            birthDate="10.22.2002"
            id="5fd924625f6ab16a19cc9807c7c506ae1813490e4ba675f843d5a10e0baacdb8"
            rootStyles={styles.card}
          />
        ) : (
          <View style={{paddingHorizontal: 16}}>
            <Text style={styles.question}>Are you already vaccinated?</Text>
            <Text style={styles.description}>
              If yes, then you are eligible for a digitized vaccination ID which
              is a proof of your vaccination
            </Text>

            <Button style={styles.vaccinationButton} full iconRight>
              <Text style={styles.vaccinationButtonText}>
                Create the Vaccination ID
              </Text>
              <Icon name="ios-card" size={16} />
            </Button>
            <View style={styles.dividerRoot}>
              <View style={styles.line} />
              <Text style={{fontSize: 20}}>or</Text>
              <View style={styles.line} />
            </View>
            <Text style={styles.description}>
              You can find vaccination center using our interactive map
            </Text>
            <Button
              style={styles.vaccinationButton}
              full
              iconRight
              onPress={() => navigation.navigate('Map')}>
              <Text style={styles.vaccinationButtonText}>Go to Map</Text>
              <Icon name="ios-map" size={16} />
            </Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  safeAreaView: {
    width: 100 + '%',
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 48,
  },
  question: {
    marginTop: 48,
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginVertical: 16,
  },
  card: {
    marginTop: 15 + '%',
  },
  vaccinationButton: {
    backgroundColor: COLORS.card,
    marginTop: 8,
  },
  vaccinationButtonText: {
    fontSize: 18,
    marginRight: 8,
  },
  line: {
    height: 2,
    width: 46 + '%',
    backgroundColor: 'black',
    marginTop: 2,
  },
  dividerRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
});

export default MainScreen;
