/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    NativeModules
} from 'react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

    // render() 方法前运行
    componentWillMount(){
        // alert('hello');
        // Http.get(Api.api_checkupdate, null, false, (result)=>{
        //     if(result.ok) {
        //         // 下载最新Apk
        //         NativeModules.upgrade.upgrade(this.state.apkUrl);
        //     }
        // });
    }
    componentDidMount() {
       // NativeModules.UpgradeModule.hello('http://192.168.1.6/app-debug.apk');
       //  NativeModules.ToastModule.show('123456789',1);
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions} onPress={()=>this.ToastExample()}>
          点击ToastExample
        </Text>
        <Text style={styles.instructions} onPress={()=>this.checkVersion()}>
          upgrade
        </Text>
      </View>
    );
  }

    ToastExample(){
        NativeModules.ToastExample.show('123456789',1);

    }

    checkVersion(){
          // NativeModules.UpgradeModule.hello('http://192.168.1.6/app-debug.apk');
       // NativeModules.UpgradeModule.upgrade('http://192.168.1.6/app-debug.apk');
            NativeModules.UpgradeModule.checkVersion("",(errorCallback)=>{
                alert(errorCallback)
            } ,(isUpgrade,apkUri)=>{
                alert(isUpgrade+'\r\n'+apkUri);
                if(isUpgrade){
                    NativeModules.UpgradeModule.upgrade(apkUri);
                }
            });
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
