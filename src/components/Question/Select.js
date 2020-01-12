import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import SelectMultiple from 'react-native-select-multiple';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import { color } from '../../config';
import styles from '../../assets/styles';
import Button from '../Button';

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
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

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
              <View style={[styles.center, { flex: 2 }]}>
                <Text style={[styles.header, { fontWeight: 'normal', textTransform: 'none' }]}>
                  {description}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text>
                  Question {number} of {totalQuestions}
                </Text>
              </View>
            </View>
            <View style={[styles.botContent, { width: screenWidth, flex: 3 }]}>
              <View style={styles.center}>
                <CountDown
                  until={timer * 60}
                  size={10}
                  style={{ backgroundColor: color.white }}
                  onFinish={nextQuestion}
                  digitStyle={{ backgroundColor: color.white }}
                  digitTxtStyle={{ color: color.primaryDark, fontSize: 18, fontWeight: 'normal' }}
                  timeToShow={['M', 'S']}
                  timeLabels={{ m: null, s: null }}
                />
              </View>
              <View style={[styles.input, { flex: 7 }]}>
                <View style={{ height: 295 }}>
                  <SelectMultiple
                    rowStyle={{ backgroundColor: 'transparent', width: screenWidth - 50 }}
                    items={data}
                    selectedItems={selectedItems}
                    onSelectionsChange={onChange}
                  />
                </View>
                <View style={styles.footer}>
                  <Button text="NEXT" variant="primary" onPress={nextQuestion} loading={loading} />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}
