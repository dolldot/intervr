import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
  FlatList,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import { color } from '../../config/config';
import { connect } from 'react-redux';

import * as question from '../../redux/actions/question';
import * as answers from '../../redux/actions/answer';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      attachment: '',
      focus: 2,
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.getData();
    console.log('===========');
    console.log(this.props.user.data.id);
    console.log('=========');
  }

  // _nextPage = async () => {
  //   // const { name, email, phone_number } = this.state;
  //   await this.props.postData(userId, questionId, answer, attachment);
  //   this._onRefresh()
  // };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ focus: 2 });
    this.setState({ refreshing: false });
  };

  _sendAnswer = async questionId => {
    // var userId = await AsyncStorage.getItem('userId');
    var userId = this.props.user.id;
    var answer = this.state.text;
    var attachment = this.state.attachment;
    await this.props.postData(userId, questionId, answer, attachment);
  };

  _pushText = text => {
    this.setState({
      text: text
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.header}>QUESTION</Text>
        </View>

        <FlatList
          data={this.props.question.data}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('Show', { id: index });
                }}
                style={styles.button}
                underlayColor="rgba(3, 3, 3, 0.5)"
              >
                <Text style={styles.buttonText}>{item.id}. {item.description}</Text>
              </TouchableHighlight>
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
        />
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
  header: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: color.white
  },
  topContent: {
    flex: 1,
    justifyContent: 'center'
  },
  botContent: {
    flex: 10,
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    borderColor: color.primaryDark,
    borderWidth: 2,
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: color.white
  },
  button: {
    flex: 1,
    justifyContent: 'center',
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
    question: state.question,
    answer: state.answer,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(question.QUESTION()),
    postData: (userId, questionId, answer, attachment) =>
      dispatch(answers.ANSWER(userId, questionId, answer, attachment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
