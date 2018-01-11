import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules
} from 'react-native';

export default class Two extends Component<{}> {

    // render() 方法前运行
    componentWillMount(){
    }
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Welcome to React Native! Two</Text>
                <Text>{this.props.navigation.state.params.token }</Text>
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