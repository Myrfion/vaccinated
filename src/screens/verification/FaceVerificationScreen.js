import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';
import {Text, View} from 'native-base';
import COLORS from '../../colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';
import DefaultButton from '../../components/DefaultButton';
import {setPhotoProof} from '../../store/actions/verification';

FaceVerificationScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  onNext: PropTypes.func.isRequired,
};

function FaceVerificationScreen(props) {
  const {navigation, onNext} = props;

  const cameraRef = useRef();
  const [photo, setPhoto] = useState(null);

  async function takePicture() {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);

      setPhoto(data.uri);
    }
  }

  function onGoNext() {
    onNext(photo);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.innerRoot}>
          <Text style={styles.title}>Facail Verification</Text>
          <View style={{flex: 1}}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.camera} />
            ) : (
              <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.front}
                style={styles.camera}
                onFacesDetected={() => console.log('face detected')}
              />
            )}

            <Image
              source={require('../../assets/face-frame.png')}
              style={styles.frame}
            />
          </View>
          {photo ? (
            <Text style={styles.description}>Great! You looks nice 🥰</Text>
          ) : (
            <Text style={styles.description}>
              Place your face in the frame and press "photo" when you ready
            </Text>
          )}

          {photo ? (
            <DefaultButton text="Submit" onPress={onGoNext} />
          ) : (
            <DefaultButton text="Photo" onPress={takePicture} />
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
  },
  frame: {
    position: 'absolute',
    width: 100 + '%',
    height: 100 + '%',
    top: 0,
    left: 0,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

const dispatchActionsToProps = {
  onNext: setPhotoProof,
};

export default connect(null, dispatchActionsToProps)(FaceVerificationScreen);
