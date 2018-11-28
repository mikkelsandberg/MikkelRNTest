import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';
import DeviceInfoCategories from './DeviceInfoCategories';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      deviceInfoInput: DeviceInfoCategories[0],
      deviceInfoOutput: '',
      deviceOrientation: Orientation.getInitialOrientation(),
    }
  }

  componentDidMount() {
    this._getDeviceInfo();

    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  _getDeviceInfo = () => {
    const { deviceInfoInput } = this.state;

    if (DeviceInfo[deviceInfoInput]() instanceof Promise) {
      this._asyncGetInfo();
    } else {
      this.setState({
        deviceInfoOutput: DeviceInfo[deviceInfoInput]()
      });
    }
  };
  
  _asyncGetInfo = async() => {
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

  _onDeviceInfoInputChange = itemValue => {
    this.setState({
      deviceInfoInput: itemValue
    }, () => {
      this._getDeviceInfo();
    });
  }

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}>
        <Picker
          style={{width: 200, height: 50}}
          selectedValue={this.state.deviceInfoInput}
          onValueChange={itemValue => this._onDeviceInfoInputChange(itemValue)}
          mode="dropdown"
        >
          {
            DeviceInfoCategories.map((item, id=0) => {
              return <Picker.Item key={id++} label={item} value={item} />
            })
          }
        </Picker>
        <Text>Hello world!</Text>
        <Text style={styles.text}>{`${this.state.deviceInfoInput} => ${this.state.deviceInfoOutput}`}</Text>
        <Text style={styles.text}>{`orientation => ${this.state.deviceOrientation}`}</Text>
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
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
