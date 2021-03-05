import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import COLORS from '../../colors';
import TextInput from '../../components/TextInput';
import DefaultButton from '../../components/DefaultButton';
import {setPersonalInfo} from '../../store/actions/verification';
import {TouchableOpacity} from 'react-native-gesture-handler';

PersonalInformationScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  onNext: PropTypes.func.isRequired,
};

function PersonalInformationScreen(props) {
  const {navigation, onNext} = props;

  const [dateDialog, setDateDialog] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);

  function onGoNext() {
    onNext({firstName, lastName, dateOfBirth});
    navigation.navigate('FaceVerification');
  }

  function onDateConfirm(date) {
    setDateOfBirth(date);
    setDateDialog(false);
  }

  function onDateCancel() {
    setDateDialog(false);
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerRoot}>
          <View>
            <Text style={styles.title}>Personal Information</Text>
            <TextInput
              value={firstName}
              onChange={setFirstName}
              placeholder="First Name"
              rootStyles={{marginTop: 32}}
            />
            <TextInput
              value={lastName}
              onChange={setLastName}
              placeholder="Last Name"
              rootStyles={styles.input}
            />
            <DefaultButton
              text="Date of birth"
              rootStyles={{marginTop: 16}}
              onPress={() => setDateDialog(true)}
            />
            <DefaultButton
              text="Continue"
              rootStyles={{marginTop: 48}}
              onPress={onGoNext}
            />

            <DateTimePickerModal
              isVisible={dateDialog}
              mode="date"
              headerTextIOS="Date of birth"
              onConfirm={onDateConfirm}
              onCancel={onDateCancel}
            />
          </View>
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
  input: {
    marginTop: 16,
  },
  dateInput: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
    padding: 16,
    marginLeft: 2,
    marginTop: 16,
  },
});

const dispatchActionsToProps = {
  onNext: setPersonalInfo,
};

export default connect(null, dispatchActionsToProps)(PersonalInformationScreen);
