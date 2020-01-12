import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import * as question from '../../redux/actions/question';
import * as answers from '../../redux/actions/answer';
import TypeText from '../../components/Question/Text';
import TypeSelect from '../../components/Question/Select';
import TypeChoice from '../../components/Question/Choice';
import TypeVideo from '../../components/Question/Video';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      focus: 0,
      selectedItems: [],
      value: '',
      attachment: ''
    };
  }

  _nextQuestion = async questionId => {
    this.setState({ loading: true });
    let datatype = this.props.questions.data[this.state.focus].type;
    let dataLen = this.props.questions.data.length;

    let items = [];
    if (datatype == 'multi_select') {
      let selected = this.state.selectedItems;
      selected.map(item => {
        items.push(item.value);
      });
    }

    if (
      this.state.value === '' &&
      this.state.selectedItems.length === 0 &&
      this.props.uri.data === ''
    ) {
      this.dropDownAlertRef.alertWithType('error', 'Error Input Form', 'Please fill the answer');
      this.setState({ loading: false });
      return;
    }

    let value = this.state.value === '' ? null : this.state.value;
    let dataItems = items.length === 0 ? null : items.toString();

    let userId = this.props.user.data.id;
    let answer = datatype == 'multi_select' ? dataItems : value;
    let attachment = datatype == 'video' ? this.props.uri.data : this.state.attachment;
    // await this.props.sendAnswer({ userId, questionId, answer, attachment });

    setTimeout(() => {
      if (this.state.focus < dataLen - 1) {
        this.setState({ focus: (this.state.focus += 1) });
      } else {
        this.props.navigation.navigate('Finish');
      }

      this.setState({ value: '' });
      this.setState({ selectedItems: [] });
      this.setState({ attachment: '' });
      this.setState({ loading: false });
    }, 500);
  };

  _pushText = text => {
    this.setState({ value: text });
  };

  _onSelectionsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const data = this.props.questions.data[this.state.focus];
    if (data.type == 'text') {
      return (
        <View>
          <TypeText
            value={this.state.value}
            loading={this.state.loading}
            description={data.description}
            timer={data.timer}
            number={data.number}
            totalQuestions={this.props.questions.data.length}
            pushText={this._pushText}
            nextQuestion={() => {
              this._nextQuestion(data.id);
            }}
          />
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      );
    }
    if (data.type == 'multi_select') {
      let str = data.options;
      let options = str.split(',');
      return (
        <View>
          <TypeSelect
            loading={this.state.loading}
            description={data.description}
            timer={data.timer}
            number={data.number}
            totalQuestions={this.props.questions.data.length}
            data={options}
            selectedItems={this.state.selectedItems}
            onChange={this._onSelectionsChange}
            nextQuestion={() => {
              this._nextQuestion(data.id);
            }}
          />
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      );
    }
    if (data.type == 'multiple_choice') {
      let str = data.options;
      let options = str.split(',');
      let choice = [];
      options.map((val, i) => {
        let data = { label: val, value: val };
        choice.push(data);
      });
      return (
        <View>
          <TypeChoice
            loading={this.state.loading}
            description={data.description}
            timer={data.timer}
            number={data.number}
            totalQuestions={this.props.questions.data.length}
            data={choice}
            onPress={value => {
              this.setState({ value: value });
            }}
            nextQuestion={() => {
              this._nextQuestion(data.id);
            }}
          />
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      );
    }
    if (data.type == 'video') {
      return (
        <View>
          <TypeVideo
            loading={this.state.loading}
            description={data.description}
            timer={data.timer}
            number={data.number}
            totalQuestions={this.props.questions.data.length}
            nextQuestion={() => {
              this._nextQuestion(data.id);
            }}
          />
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    answer: state.answer,
    user: state.user,
    uri: state.uri
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: () => dispatch(question.questions()),
    sendAnswer: value => dispatch(answers.answer(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
