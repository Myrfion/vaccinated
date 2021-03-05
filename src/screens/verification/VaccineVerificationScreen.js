import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FileService from '../../services/FileService';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {setVaccineProof} from '../../store/actions/verification';

VaccineVerificationScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  onNext: PropTypes.func.isRequired,
};

function VaccineVerificationScreen(props) {
  const {navigation, onNext} = props;

  const [vaccinationProof, setVaccinationProof] = useState(null);

  async function onUploadFile() {
    const res = await FileService.pickFile();

    setVaccinationProof(res);
  }

  function onScanDocument() {
    FileService.scanDocument(setVaccinationProof);
  }

  function onGoNext() {
    onNext(vaccinationProof);
    navigation.navigate('IdentityVerification');
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerRoot}>
          <View>
            <Text style={styles.title}>Upload the proof of vaccination</Text>
            <Text style={styles.description}>
              Please scan the document you have gotten when you were vaccinated
              to verify. Once your document is verified, you will receive a
              special ID that confirms your vaccination.
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={onScanDocument}>
                <Icon name="ios-camera" size={100} color={COLORS.background} />
                <Text style={styles.buttonLabel}>Scan document</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onUploadFile}>
                <Icon
                  name="ios-cloud-upload"
                  size={100}
                  color={COLORS.background}
                />
                <Text style={styles.buttonLabel}>Upload document</Text>
              </TouchableOpacity>
            </View>
          </View>
          {vaccinationProof && (
            <View style={styles.goNextButtonContainer}>
              <Text style={styles.goNextDescription}>
                Great! Document is uploaded!
              </Text>
              <Button full style={styles.goNextButton} onPress={onGoNext}>
                <Text>Go next</Text>
              </Button>
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
  goNextButton: {
    backgroundColor: COLORS.card,
    marginTop: 16,
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
  onNext: setVaccineProof,
};

export default connect(null, dispatchActionsToProps)(VaccineVerificationScreen);
