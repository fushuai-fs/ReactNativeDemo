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

import GlobalProps from '../GlobalProps.json'

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
       // alert(text);
        return (
            <View style={styles.container}>
                <Text>Welcome to React Native! One</Text>

                <Button title='Go to Two' onPress={()=>this.btnclick()}/>
                <Button title='Go to Two not back' onPress={()=>this.btnclicknotback()}/>

                <Text>{global.SupplierCode }</Text>
            </View>
        );
    }

    btnclick(){
        global.SupplierCode='63967667';
        this.props.navigation.navigate("Two",{ token: 'abcd' });
    }
    btnclicknotback(){
        const  navi = this.props.navigation;
        fetch(GlobalProps.LoginUrl, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Method=Login&SupplierCode=63967667&UserName=fushuai&PassWord=1'
        })
            .then((response)=>response.json())
            .then((data)=>{
            //alert(global.SupplierCode);
                global.SupplierCode='63967667';
               // const jsonstr =JSON.stringify(data);
               // alert('Request succeeded with JSON response\r\n'+jsonstr);
                // this.setState({netresult:JSON.stringify(data)});
                // 跳转不允许返回 ，例如登录跳转
                // this.props.navigation.dispatch(
                //     NavigationActions.reset({
                //         index: 0,
                //         actions: [
                //             NavigationActions.navigate({routeName: 'Two', params: { token: '123456' }})
                //         ]
                //     })
                // );
                // 注意： 如果route在tabNavigator里就接收不到params参数了
                navi.dispatch( NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Two', params: { token: 'abcdefg' }})
                    ]
                })
            );

            })
            .catch(function (error) {
                alert('Request failed\r\n'+ error);
            });

        // navi.navigate("Two",{ token: '123456' });
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