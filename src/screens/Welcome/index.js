import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import * as question from '../../redux/actions/question';
import Button from '../../components/Button';
import { color } from '../../config';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await this.props.getQuestions();
    this.props.questions.isError
      ? this.dropDownAlertRef.alertWithType('error', 'Error Fetching Question', 'Please reload')
      : this.setState({ loading: false });
    this.setState({ loading: false });
  }

  _nextPage = () => {
    this.setState({ loading: true });
    this.props.navigation.navigate('Question');
    this.setState({ loading: false });
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
                  WELCOME TO INTERVIEW
                </Text>
              </View>
              <View style={[styles.input, { width: screenWidth - 50 }]}>
                <Text>Welcome candidate,</Text>
                <Text>
                  Please answer questions as best as possible, because it affects us in making
                  decisions whether to recruit you or not.
                </Text>
                <Text style={{ marginTop: 20 }}>
                  Number of questions is {this.props.questions.data.length}
                </Text>
                <Text style={{ marginTop: 20 }}>Press start button when you ready</Text>
              </View>
              <View style={styles.footer}>
                <Button
                  text="START"
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
    alignItems: 'flex-start',
    color: color.primaryDark,
    fontSize: 17
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: color.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  }
});

const mapStateToProps = state => {
  return {
    questions: state.questions
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
)(Welcome);
