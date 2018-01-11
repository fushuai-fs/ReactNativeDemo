import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules
} from 'react-native';

export default class Three extends Component<{}> {

    // render() 方法前运行
    componentWillMount(){
    }
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>   Welcome to React Native! Three</Text>
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

});