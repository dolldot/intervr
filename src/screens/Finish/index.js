import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';
import { color } from '../../config';
import styles from '../../assets/styles';

export default class Finish extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Register');
    }, 10000);
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
                  THANK YOU
                </Text>
              </View>
              <View
                style={[
                  styles.input,
                  { width: screenWidth - 50, alignItems: 'flex-start', justifyContent: 'center' }
                ]}
              >
                <Text style={{ fontSize: 18 }}>
                  We thank you for your participation, We will review your application, and inform
                  you in upcoming days.
                </Text>
              </View>
              <View style={[styles.footer, { flex: 2 }]}>
                <Text style={{ fontStyle: 'italic' }}>
                  Choose a job you Love and you will never have to work a day
                </Text>
                <Text style={{ textAlign: 'right', fontStyle: 'italic', marginRight: 50 }}>
                  -Confucius
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </ScrollView>
    );
  }
}
