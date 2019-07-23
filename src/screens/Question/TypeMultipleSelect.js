import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { color } from '../../config/config';
import SelectMultiple from 'react-native-select-multiple';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Loader from './Loader';

export default class TypeMultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any.isRequired,
    description: PropTypes.string.isRequired,
    timer: PropTypes.any.isRequired,
    number: PropTypes.any.isRequired,
    totalQuestions: PropTypes.any.isRequired,
    selectedItems: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
  };

  render() {
    const {
      loading,
      data,
      description,
      timer,
      number,
      totalQuestions,
      selectedItems,
      onChange,
      nextQuestion
    } = this.props;
    // Alert.alert('', JSON.stringify(this.state.data));
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loader loading={loading} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#56CCF2', '#2F80ED']}
          style={styles.container}
        >
          <View style={styles.boxContent}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Question {number} of {totalQuestions}
              </Text>
              <CountDown
                until={timer * 60}
                size={20}
                style={styles.time}
                onFinish={nextQuestion}
                digitStyle={{ backgroundColor: '#a745d1' }}
                digitTxtStyle={{ color: color.white }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
              />
            </View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#56CCF2', '#2F80ED']}
              style={styles.content}
            >
              <View style={styles.topContent}>
                <Text style={styles.description}>{description}</Text>
              </View>
              <View style={styles.botContent}>
                <SelectMultiple
                  rowStyle={{ backgroundColor: 'transparent' }}
                  items={data}
                  selectedItems={selectedItems}
                  onSelectionsChange={onChange}
                />
              </View>
            </LinearGradient>
            <View style={styles.footer}>
              <TouchableHighlight
                onPress={nextQuestion}
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 6,
    padding: 20,
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
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    flex: 3
  },
  description: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 10
  },
  time: {
    justifyContent: 'center',
    flex: 2
  },
  topContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  botContent: {
    flex: 3,
    justifyContent: 'flex-end'
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
