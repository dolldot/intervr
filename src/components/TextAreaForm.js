import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';
import propTypes from 'prop-types';
import { color } from '../config';

class TextAreaForm extends Component {
  static propTypes = {
    attrName: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    height: propTypes.any,
    customStyle: propTypes.any,
    keyboardType: propTypes.string,
    titleActiveSize: propTypes.number,
    titleInActiveSize: propTypes.number,
    titleActiveColor: propTypes.string,
    titleInActiveColor: propTypes.string,
    variant: propTypes.string,
    errorMsg: propTypes.string
  };

  static defaultProps = {
    height: 50,
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: color.secondaryLight,
    titleInActiveColor: 'dimgrey',
    variant: 'primary'
  };

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      errorMsg: null
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.props.value) this.setState({ errorMsg: null });
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });

      if (this.props.errorMsg) this.setState({ errorMsg: this.props.errorMsg });
      else this.setState({ errorMsg: 'Please fill the form' });

      Animated.timing(this.position, {
        toValue: 0,
        duration: 150
      }).start();
    }
  };

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const { titleActiveColor, titleInActiveColor, titleActiveSize, titleInActiveSize } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0]
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInActiveColor
    };
  };

  render() {
    const { title, value, onChange, keyboardType, variant, customStyle } = this.props;

    let selectedColor;
    if (variant === 'primary') selectedColor = color.primary;
    if (variant === 'secondary') selectedColor = color.secondary;
    if (variant === 'dark') selectedColor = color.primaryDark;

    return (
      <View style={[styles.container, { borderColor: selectedColor, height: this.props.height }]}>
        <Animated.Text style={[styles.titleStyles, this._returnAnimatedTitleStyles()]}>
          {title}
        </Animated.Text>
        <TextInput
          value={value}
          style={[styles.textInput, customStyle, { height: this.props.height }]}
          underlineColorAndroid="transparent"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={onChange}
          keyboardType={keyboardType}
          multiline={true}
        />
        {this.state.errorMsg ? <Text style={{ fontSize: 11 }}>{this.state.errorMsg}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '100%',
    borderRadius: 13,
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 4
  },
  textInput: {
    width: 300,
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'Avenir-Medium',
    color: 'black',
    paddingHorizontal: 10,
    textAlignVertical: 'top'
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 10
  }
});

export default TextAreaForm;
