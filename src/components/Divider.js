import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

Divider.propTypes = {
  rootStyles: PropTypes.instanceOf(Object),
};

Divider.defaultProps = {
  rootStyles: {},
};

function Divider(props) {
  const {rootStyles} = props;

  return (
    <View style={[styles.dividerRoot, rootStyles]}>
      <View style={styles.line} />
      <Text style={{fontSize: 20}}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 100 + '%',
  },
});

export default Divider;
