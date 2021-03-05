import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../colors';
import {Button} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '',
});

EntryScreen.propTypes = {};

async function onGoogleButtonPress() {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
}

function EntryScreen(props) {
  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerRoot}>
          <Button style={[styles.button, styles.emailButton]} full>
            <Text style={styles.buttonText}>Sign Up with Email</Text>
          </Button>
          <Button
            style={[styles.button, styles.googleButton]}
            full
            iconLeft
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }>
            <Icon name="logo-google" size={18} />
            <Text style={[styles.buttonText, styles.googleButtonText]}>
              Sign Up with Google
            </Text>
          </Button>
          <TouchableOpacity style={styles.signUpLabel}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={{textDecorationLine: 'underline'}}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  innerRoot: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 32,
    alignItems: 'center',
  },
  button: {
    borderRadius: 4,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  emailButton: {
    backgroundColor: COLORS.card,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: COLORS.white,
  },
  googleButtonText: {
    marginLeft: 8,
  },
  signUpLabel: {
    marginTop: 32,
  },
  signUpText: {
    fontSize: 16,
  },
});

export default EntryScreen;
