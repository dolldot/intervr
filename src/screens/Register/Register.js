import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import * as user from '../../redux/actions/user';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

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

    if (name == '' && email == '' && phone_number == '') return alert('Please fill the form');
    if (name == '') return alert('Name cannot be empty');
    if (email == '') return alert('Email cannot be empty');
    if (phone_number == '') return alert('Phone Number cannot be empty');

    await this.props.postUser({ name, email, phone_number });
    this.props.user.isError ? alert('Register fail') : this.props.navigation.navigate('Welcome');
    this.setState({ name: '' });
    this.setState({ email: '' });
    this.setState({ phone_number: '' });
  };

  _pushName = text => {
    this.setState({ name: text });
  };

  _pushEmail = text => {
    this.setState({ email: text });
  };

  _pushNumber = text => {
    this.setState({ phone_number: text });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#56CCF2', '#2F80ED']}
          style={styles.container}
        >
          <View style={styles.boxContent}>
            <View style={styles.header}>
              <Text style={styles.welcome}>JOIN THE INTERVIEW</Text>
            </View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#56CCF2', '#2F80ED']}
              style={styles.content}
            >
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
                keyboardType={'number-pad'}
              />
            </LinearGradient>
            <View style={styles.footer}>
              <TouchableHighlight
                onPress={() => {
                  this._nextPage();
                }}
                style={styles.button}
                underlayColor="#5f0059"
              >
                <Text style={styles.textButton}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a745d1'
  },
  boxContent: {
    backgroundColor: '#5f0059',
    borderWidth: 2,
    borderColor: '#eee',
    width: '90%',
    height: '95%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 6,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#f6c7ff',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  topContent: {
    flex: 1,
    alignItems: 'center'
  },
  botContent: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: '95%',
    borderColor: '#eee',
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'transparent'
  },
  button: {
    backgroundColor: '#a745d1',
    padding: 15,
    width: '30%',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postUser: value => dispatch(user.user(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
