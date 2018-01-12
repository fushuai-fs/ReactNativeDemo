/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    NetInfo,
    ToastAndroid,
    Dimensions,
    WebView
} from 'react-native';

//获取设备的宽度和高度
var {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

export default class WebViewDemo extends  Component<{}>  {
    constructor(props){
        super(props);
        this.state = {
            isConnected: null,
            connectionInfo:null,
        };
    }
    componentDidMount() {


    }
    componentWillUnmount() {
    }
    render() {
        return (
            <View style={{flex:1}}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                         source={{uri:'https://news.163.com/',method: 'GET'}}
                         style={{width:deviceWidth, height:deviceHeight}}

                >
                </WebView>
                {/*<Text>{this.props.navigation.state.params.token }</Text>*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    welcome: {
        fontSize: 16,
        textAlign: 'left',
        margin: 10,
    },
});