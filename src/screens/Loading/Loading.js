import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as question from '../../redux/actions/question';

class Loading extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Register');
    }, 2500);
  }
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
            <View style={styles.header} />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#56CCF2', '#2F80ED']}
              style={styles.content}
            >
              <Image source={require('../../assets/img/logo.png')} />
              <Text style={{ color: 'black', fontSize: 40, fontWeight: 'bold' }}>InterVR</Text>
            </LinearGradient>
            <View style={styles.footer} />
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  botContent: {
    flex: 2
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
    question: state.question
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: () => dispatch(question.questions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
