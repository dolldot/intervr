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

class Show extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      attachment: 'kosong',
      focus: 2,
      refreshing: false
    };
  }

  // componentDidMount() {
  //   this.props.getData();
  // }

  _sendAnswer = async questionId => {
    var userId = await AsyncStorage.getItem('userId');
    // var userId = this.props.user.id;
    var answer = this.state.text;
    var attachment = this.state.attachment;
    await this.props.postData(userId, questionId, answer, attachment);
    if (!this.props.answer.isError) {
      this.props.navigation.navigate('Question');
    }
  };

  _pushText = text => {
    this.setState({
      text: text
    });
  };

  render() {
    // let id = this.props.navigation.navigate('View', { id: item.id })
    let id = this.props.navigation.getParam('id', 0);
    let data = this.props.question.data[id];

    if (data.type == 'text') {
      return (
        <View style={styles.botContent}>
          <Text style={{ flex: 1, color: color.primary, alignSelf: 'center', marginBottom: 70 }}>
            {data.description}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={this._pushText}
            multiline={true}
            numberOfLines={7}
            placeholder="enter answer..."
          />
          <TouchableHighlight
            onPress={() => {
              this._sendAnswer(data.id);
            }}
            style={styles.button}
            underlayColor="rgba(3, 3, 3, 0.5)"
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      );
    }
    if (data.type == 'multi_select') {
      return (
        <View style={styles.botContent}>
          <Text style={{ flex: 1, color: color.primary, alignSelf: 'center', marginBottom: 70 }}>
            {data.description}
          </Text>
          <TouchableHighlight
            onPress={() => {
              this._sendAnswer(data.id);
            }}
            style={styles.button}
            underlayColor="rgba(3, 3, 3, 0.5)"
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      );
    }
    // if (data.type == 'multi_select') {
    //   return (
    //     <View style={styles.botContent}>
    //       <Text style={{ flex: 1, color: color.white, alignSelf: 'center', marginBottom: 70 }}>
    //         {data.description}
    //       </Text>
    //       <TouchableHighlight
    //         onPress={() => {
    //           this._sendAnswer(data.id);
    //         }}
    //         style={styles.button}
    //         underlayColor="rgba(3, 3, 3, 0.5)"
    //       >
    //         <Text style={styles.buttonText}>SUBMIT</Text>
    //       </TouchableHighlight>
    //     </View>
    //   );
    // }
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
    backgroundColor: color.primaryLight
  },
  button: {
    flex: 1,
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
)(Show);
