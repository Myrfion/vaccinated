import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import COLORS from '../colors';

DefaultButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  rootStyles: PropTypes.instanceOf(Object),
};

DefaultButton.defaultProps = {
  rootStyles: {},
};

function DefaultButton(props) {
  const {onPress, text, rootStyles} = props;

  return (
    <Button full style={[styles.root, rootStyles]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.card,
  },
  text: {
    color: COLORS.black,
  },
});

export default DefaultButton;
