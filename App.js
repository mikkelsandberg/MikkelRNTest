import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class App extends Component {
  render() {
    const DevInfo = target => {
      if (DeviceInfo[target]() instanceof Promise) {
        asyncGetInfo();
      } else {
        return DeviceInfo[target]();
      }
    }

    async function asyncGetInfo() {
      try {
        const data = await DeviceInfo[methodToUse]();
        console.log(data);
        return data;
      } catch(err) {
        console.log(err);
      }
    }

    const methodToUse = 'getBatteryLevel';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{`${methodToUse} => ${DevInfo(methodToUse)}`}</Text>
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
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
