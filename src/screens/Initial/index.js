import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as question from '../../redux/actions/question';
import styles from '../../assets/styles';
import { color } from '../../config';

class Initial extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Register');
    }, 2500);
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[color.primaryLight, color.primary]}
          style={[styles.container, { width: screenWidth, height: screenHeight, flex: 1 }]}
        >
          <View style={styles.center}>
            <Image source={require('../../assets/img/logo.png')} />
            <Text
              style={{
                fontSize: 40,
                color: color.primaryDark,
                fontWeight: 'bold'
              }}
            >
              InterVR
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

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
)(Initial);
