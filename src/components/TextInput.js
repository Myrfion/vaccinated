import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Input, Item} from 'native-base';
import COLORS from '../colors';

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  rootStyles: PropTypes.instanceOf(Object).isRequired,
};

function TextInput(props) {
  const {value, onChange, placeholder, rootStyles} = props;

  return (
    <Item regular style={[styles.root, rootStyles]}>
      <Input placeholder={placeholder} value={value} onChangeText={onChange} />
    </Item>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
});

export default TextInput;
