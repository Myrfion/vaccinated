import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import CardFlip from 'react-native-card-flip';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import COLORS from '../colors';

Card.propTypes = {
  picture: PropTypes.instanceOf(Object).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  rootStyles: PropTypes.instanceOf(Object),
};

Card.defaultProps = {
  rootStyles: {},
};

function Card(props) {
  const {picture, firstName, lastName, birthDate, id, rootStyles} = props;

  const card = useRef();

  return (
    <CardFlip style={[styles.root, rootStyles]} ref={card}>
      <TouchableOpacity style={styles.face} onPress={() => card.current.flip()}>
        <Text style={styles.title}>Vaccination ID</Text>
        <View style={styles.infoRoot}>
          <View style={styles.imageRoot}>
            <Image source={picture} style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.birthDate}>
              Date of {'\n'}Birth:{'\n'}
              {birthDate}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.name}>
          {firstName} {'\n'}
          {lastName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.back} onPress={() => card.current.flip()}>
        <QRCode size={250} value={id} backgroundColor={COLORS.card} />
      </TouchableOpacity>
    </CardFlip>
  );
}

const cardStyles = {
  height: 400,
  width: 100 + '%',
  borderRadius: 8,
};

const styles = StyleSheet.create({
  root: {
    height: 400,
    width: 80 + '%',
  },
  face: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 24,
    paddingVertical: 32,
    ...cardStyles,
  },
  back: {
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...cardStyles,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: COLORS.black,
  },
  infoRoot: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: 'row',
  },
  info: {
    marginLeft: 16,
  },
  imageRoot: {
    borderColor: COLORS.background,
    borderWidth: 3,
    width: 130,
  },
  image: {
    width: 100 + '%',
    height: 150,
  },
  name: {
    fontSize: 40,
    fontWeight: '500',
    color: COLORS.black,
  },
  birthDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  line: {
    width: 100 + '%',
    height: 2,
    backgroundColor: COLORS.background,
    marginBottom: 20,
  },
});

export default Card;
