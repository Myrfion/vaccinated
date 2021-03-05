import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import COLORS from '../colors';
import Card from '../components/Card';
import {Button, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../components/Divider';
import FirebaseService from '../services/FirebaseService';
import auth from '@react-native-firebase/auth';

MainScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

function MainScreen(props) {
  const {navigation} = props;
  //auth().signOut();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      setUserInfo(await FirebaseService.fetchPersonalInfo());
      setLoading(false);
    })();
  }, []);

  const vaccinated = userInfo?.vaccinationStatus === 'vaccinated';
  console.log(userInfo);
  return (
    <View style={styles.root}>
      <SafeAreaView
        style={[styles.safeAreaView, vaccinated ? {alignItems: 'center'} : {}]}>
        {loading ? (
          <Spinner color="white" />
        ) : vaccinated ? (
          <Card
            picture={{uri: userInfo.photo}}
            birthDate={userInfo.dateOfBirth}
            id={userInfo.id}
            rootStyles={styles.card}
            firstName={userInfo.firstName}
            lastName={userInfo.lastName}
          />
        ) : (
          <View style={{paddingHorizontal: 16}}>
            {userInfo?.vaccinationStatus === 'verification' ? (
              <Text style={styles.question}>
                Sorry... We still verificating your vaccination ID
              </Text>
            ) : (
              <>
                <Text style={styles.question}>Are you already vaccinated?</Text>
                <Text style={styles.description}>
                  If yes, then you are eligible for a digitized vaccination ID
                  which is a proof of your vaccination
                </Text>
                <Button
                  style={styles.vaccinationButton}
                  full
                  iconRight
                  onPress={() => navigation.navigate('VaccineVerification')}>
                  <Text style={styles.vaccinationButtonText}>
                    Create the Vaccination ID
                  </Text>
                  <Icon name="ios-card" size={16} />
                </Button>
                <Divider />
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
              </>
            )}
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
});

export default MainScreen;
