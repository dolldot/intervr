import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { url, color } from '../../config/config';
import axios from 'axios';
import * as user from '../../redux/actions/user';
import { connect } from 'react-redux';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone_number: ''
    };
  }

  _nextPage = async () => {
    const { name, email, phone_number } = this.state;
    await this.props.postData(name, email, phone_number);
    var id = this.props.user.data.id.toString()
    await AsyncStorage.setItem('userId', id)
    this.props.user.isError ? alert("Tidak bisa wey") : this.props.navigation.navigate('Question')
  };

  _pushName = text => {
    this.setState({
      name: text
    });
  };

  _pushEmail = text => {
    this.setState({
      email: text
    });
  };

  _pushNumber = text => {
    this.setState({
      phone_number: text
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text
            style={{
              fontWeight: 'bold',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: 10,
              fontSize: 20,
              color: color.white
            }}
          >
            BIODATA
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={this._pushName}
            value={this.state.name}
            placeholder="Name"
          />

          <TextInput
            style={styles.input}
            onChangeText={this._pushEmail}
            value={this.state.email}
            placeholder="Email"
          />

          <TextInput
            style={styles.input}
            onChangeText={this._pushNumber}
            value={this.state.phone_number}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.botContent}>
          <TouchableHighlight
            onPress={this._nextPage}
            style={styles.button}
            underlayColor="rgba(3, 3, 3, 0.5)"
          >
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postData: (name, email, phone) => dispatch(user.USER(name, email, phone))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
