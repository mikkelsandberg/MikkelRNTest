import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      deviceInfoInput: 'isTablet',
      deviceInfoOutput: '',
    }
  }

  componentDidMount() {
    const { deviceInfoInput } = this.state;

    if (DeviceInfo[deviceInfoInput]() instanceof Promise) {
      this.asyncGetInfo();
    } else {
      return this.setState({
        deviceInfoOutput: DeviceInfo[deviceInfoInput]()
      });
    }
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

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{`${this.state.deviceInfoInput} => ${this.state.deviceInfoOutput}`}</Text>
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
