import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      deviceInfoInput: 'isTablet',
      deviceInfoOutput: '',
      deviceOrientation: Orientation.getInitialOrientation()
    }
  }

  componentDidMount() {
    const { deviceInfoInput } = this.state;

    if (DeviceInfo[deviceInfoInput]() instanceof Promise) {
      this.asyncGetInfo();
    } else {
      this.setState({
        deviceInfoOutput: DeviceInfo[deviceInfoInput]()
      });
    }

    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }
  
  async asyncGetInfo() {
    try {
      const { deviceInfoInput } = this.state;
      const data = await DeviceInfo[deviceInfoInput]();
      return this.setState({
        deviceInfoOutput: data
      });
    } catch(err) {
      console.log(err);
    }
  }

  _onOrientationDidChange = orientation => {
    this.setState({
      deviceOrientation: orientation
    });
  };

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{`${this.state.deviceInfoInput} => ${this.state.deviceInfoOutput}`}</Text>
        <Text style={styles.instructions}>{`orientation => ${this.state.deviceOrientation}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
