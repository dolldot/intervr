import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { url, color } from '../../config/config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone_number: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>WELCOME TO PT. HIDUP EMANG PAHIT</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('Register');
          }}
          style={styles.button}
          underlayColor="rgba(3, 3, 3, 0.5)"
        >
          <Text style={{color: 'white'}}>
            MULAI
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: color.primary
  },
  topContent: {
    flex: 8,
    justifyContent: 'center'
  },
  botContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  input: {
    height: 50,
    borderColor: color.primaryDark,
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: color.white
  },
  button: {
    justifyContent: 'center',
    backgroundColor: color.primaryDark,
    padding: 20,
    borderRadius: 10
  },
  buttonText: {
    color: color.white,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
