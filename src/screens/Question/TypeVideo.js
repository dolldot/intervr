import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { color } from '../../config/config';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Loader from './Loader';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import * as uri from '../../redux/actions/uri';

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
          // alert(data.uri);
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
    const { loading, description, timer, number, totalQuestions, nextQuestion } = this.props;
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={() => {
          this._takeVideo();
        }}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
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
          <Text style={{ fontSize: 14 }}> STOP </Text>
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
                <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={styles.preview}
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
                >
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    {button}
                  </View>
                </RNCamera>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
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
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

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
