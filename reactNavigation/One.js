import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Button,

} from 'react-native';
import { NavigationActions } from 'react-navigation';


export default class One extends Component<{}> {
    constructor (props) {
        super (props)
        this.state = {
             text:1
        }
    }
    // render() 方法前运行
    componentWillMount(){
    }
    componentDidMount() {
    }

    render() {
        const  text = this.state.text +1;
        alert(text);
        return (
            <View style={styles.container}>
                <Text>Welcome to React Native! One</Text>

                <Button title='Go to Two' onPress={()=>this.btnclick()}/>
                <Button title='Go to Two not back' onPress={()=>this.btnclicknotback()}/>
            </View>
        );
    }

    btnclick(){
        this.props.navigation.navigate("Two");
    }
    btnclicknotback(){
        // 跳转不允许返回 ，例如登录跳转
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Two', params: { token: '123456' }})
                ]
            })
          );
       // this.state.navigation.navigate("Two");
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