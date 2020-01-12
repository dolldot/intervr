import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { color } from '../../config';
import * as uri from '../../redux/actions/uri';
import styles from '../../assets/styles';
import Button from '../Button';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class TypeVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordOptions: {
        mute: false,
        maxDuration: this.props.timer * 60,
        quality: RNCamera.Constants.VideoQuality['720p']
      },
      isRecording: false,
      recording: false,
      processing: false
    };
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    timer: PropTypes.any.isRequired,
    number: PropTypes.any.isRequired,
    totalQuestions: PropTypes.any.isRequired,
    nextQuestion: PropTypes.func.isRequired
  };

  _takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ recording: true });
          const data = await promise;
          this.setState({ recording: false });
          this.props.saveUri(data.uri);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  _stopRecording() {
    this.camera.stopRecording();
    this.setState({ recording: false });
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const { loading, description, timer, number, totalQuestions, nextQuestion } = this.props;
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={() => {
          this._takeVideo();
        }}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14, color: color.white }}>RECORD</Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={() => {
            this._stopRecording();
          }}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14, color: color.white }}>STOP</Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

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
                  <RNCamera
                    ref={ref => {
                      this.camera = ref;
                    }}
                    style={[styles.preview, { width: screenWidth - 150 }]}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                      title: 'Permission to use camera',
                      message: 'We need your permission to use your camera',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel'
                    }}
                    androidRecordAudioPermissionOptions={{
                      title: 'Permission to use audio recording',
                      message: 'We need your permission to use your audio',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel'
                    }}
                  />
                  {button}
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

const mapStateToProps = state => {
  return {
    uri: state.uri
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUri: value => dispatch(uri.uri(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeVideo);
