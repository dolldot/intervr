import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Dimensions, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';
import { color } from '../config';

class Button extends Component {
  static propTypes = {
    text: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
    variant: propTypes.string.isRequired,
    loading: propTypes.bool
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { text, onPress, variant, loading } = this.props;
    const screenWidth = Math.round(Dimensions.get('window').width);

    let selectedColor;
    if (variant === 'primary') selectedColor = color.primary;
    if (variant === 'secondary') selectedColor = color.secondary;
    if (variant === 'dark') selectedColor = color.primaryDark;

    return (
      <TouchableHighlight
        style={[styles.button, { backgroundColor: selectedColor, width: screenWidth - 50 }]}
        underlayColor={color.primaryLight}
        onPress={() => onPress()}
      >
        {loading ? (
          <ActivityIndicator size="small" color={color.white} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: color.white
  }
});

export default Button;
