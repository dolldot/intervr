import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import * as user from '../../redux/actions/user';
import Button from '../../components/Button';
import InputForm from '../../components/InputForm';
import { color } from '../../config';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone_number: '',
      loading: false
    };
  }

  _nextPage = async () => {
    const { name, email, phone_number } = this.state;
    this.setState({ loading: true });

    if (name === '' || email === '' || phone_number === '') {
      this.dropDownAlertRef.alertWithType('error', 'Error Input Form', 'Please fill the form');
      this.setState({ loading: false });
      return;
    }

    // await this.props.postUser({ name, email, phone_number });
    // this.props.user.isError ? alert('Register fail') : this.props.navigation.navigate('Welcome');
    this.props.navigation.navigate('Welcome');
    this.setState({ name: '' });
    this.setState({ email: '' });
    this.setState({ phone_number: '' });
    this.setState({ loading: false });
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
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[color.primaryLight, color.primary]}
          style={[styles.container, { width: screenWidth, height: screenHeight }]}
        >
          <View style={styles.content}>
            <View style={styles.topContent}>
              <View style={styles.center}>
                <Text style={styles.header}>PT. CODER CEDER</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ width: 100, height: 80 }}
                  source={require('../../assets/img/logo.png')}
                />
              </View>
            </View>
            <View style={[styles.botContent, { width: screenWidth }]}>
              <View style={styles.center}>
                <Text
                  style={[styles.header, { color: color.primaryDark, fontSize: 18, marginTop: 10 }]}
                >
                  JOIN THE INTERVIEW
                </Text>
              </View>
              <View style={styles.input}>
                <InputForm
                  attrName="name"
                  title="Name"
                  value={this.state.name}
                  onChange={this._pushName}
                  customStyle={{ width: screenWidth - 50 }}
                  variant="secondary"
                  errorMsg="Name cannot be empty"
                />
                <InputForm
                  attrName="email"
                  title="Email"
                  value={this.state.email}
                  onChange={this._pushEmail}
                  customStyle={{ width: screenWidth - 50 }}
                  variant="secondary"
                  errorMsg="Email cannot be empty"
                />
                <InputForm
                  attrName="phone_number"
                  title="Phone Number"
                  value={this.state.phone_number}
                  onChange={this._pushNumber}
                  customStyle={{ width: screenWidth - 50 }}
                  variant="secondary"
                  keyboardType="number-pad"
                  errorMsg="Phone Number cannot be empty"
                />
              </View>
              <View style={styles.footer}>
                <Button
                  text="JOIN"
                  variant="primary"
                  onPress={() => this._nextPage()}
                  loading={this.state.loading}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: color.white
  },
  content: {
    height: '100%',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: color.white,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  botContent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
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
