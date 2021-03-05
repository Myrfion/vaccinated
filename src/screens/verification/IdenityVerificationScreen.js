import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FileService from '../../services/FileService';
import DefaultButton from '../../components/DefaultButton';
import {setIdentityProof} from '../../store/actions/verification';

IdentityVerificationScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  onNext: PropTypes.func.isRequired,
};

function IdentityVerificationScreen(props) {
  const {navigation, onNext} = props;

  const [vaccinationProof, setVaccinationProof] = useState(null);

  function onScanDocument(type) {
    FileService.scanDocument(doc => {
      setVaccinationProof({
        uri: doc.uri,
        type: type,
      });
    });
  }

  function onGoNext() {
    navigation.navigate('PersonalInformation');
    onNext(vaccinationProof);
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerRoot}>
          <View>
            <Text style={styles.title}>Upload the proof of identity</Text>
            <Text style={styles.description}>
              Please upload a proof of Identity to verify your Vaccination ID is
              valid. You can choose to upload a picture of your driving license,
              or a picture of your passport
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onScanDocument('driving license')}>
                <Icon name="ios-car" size={100} color={COLORS.background} />
                <Text style={styles.buttonLabel}>Driving Lincense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onScanDocument('passport')}>
                <Icon name="ios-person" size={100} color={COLORS.background} />
                <Text style={styles.buttonLabel}>Passport</Text>
              </TouchableOpacity>
            </View>
          </View>
          {vaccinationProof && (
            <View style={styles.goNextButtonContainer}>
              <Text style={styles.goNextDescription}>Great! It is ready</Text>
              <DefaultButton
                onPress={onGoNext}
                text="Go to the next step"
                rootStyles={{marginTop: 16}}
              />
            </View>
          )}
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
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    marginTop: 48,
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginVertical: 20,
  },
  buttonsContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 155,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonLabel: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  goNextDescription: {
    fontSize: 16,
  },
  goNextButtonContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

const dispatchActionsToProps = {
  onNext: setIdentityProof,
};

export default connect(
  null,
  dispatchActionsToProps,
)(IdentityVerificationScreen);
