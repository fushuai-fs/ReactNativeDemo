import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Animated,TextInput,TouchableWithoutFeedback,
    View,
    NativeModules,
    Button,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

import GlobalProps from '../GlobalProps.json'

 // import Search from 'react-native-search-box'
import Search from '../Search'
import InputComponent from '../Components/InputComponent'
const { width } = Dimensions.get('window');

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

    onFocus = async () => {
        alert(this.refs.input_keyword._component.isFocused);
        this.props.beforeFocus && (await this.props.beforeFocus());
        this.refs.input_keyword._component.isFocused &&
        (await this.refs.input_keyword._component.focus());
        await this.setState(prevState => {
            return { expanded: !prevState.expanded };
        });
        // await this.expandAnimation();
        this.props.onFocus && (await this.props.onFocus(this.state.keyword));
        this.props.afterFocus && (await this.props.afterFocus());
    };
    render() {

        const  text = this.state.text +1;
       // alert(text);
        return (
            <View style={styles.container}>
                <InputComponent ref={'test'}/>
                <Search
                    ref="search_box" cancelTitle={'取消'} contentWidth={width} onSearch={()=>this.onSearchOne()}/>
                <Text>Welcome to React Native! One</Text>

                <Button title='Go to Two' onPress={()=>this.btnclick()}/>
                <Button title='Go to Two not back' onPress={()=>this.btnclicknotback()}/>

                <Text>{global.SupplierCode }</Text>

                <TextInput ref={'input_keyword'} style={{width:width-20}}>
                    <TouchableWithoutFeedback onPress={this.onFocus}>
                        {this.props.iconSearch
                            ? <Animated.View
                                style={[styles.iconSearch, { left: this.iconSearchAnimated }]}
                            >
                                {this.props.iconSearch}
                            </Animated.View>
                            : <Animated.Image
                                source={require('../img/search.png')}
                                style={[
                                    styles.iconSearch,
                                    styles.iconSearchDefault,
                                    this.props.tintColorSearch && {
                                        tintColor: this.props.tintColorSearch
                                    },
                                    {
                                        left: this.iconSearchAnimated
                                    }
                                ]}
                            />}
                    </TouchableWithoutFeedback>
                </TextInput>




            </View>
        );
    }
    onSearchOne = async () => {
        alert('OneSearch');
        this.props.beforeSearch &&
        (await this.props.beforeSearch(this.state.keyword));
        if (this.props.keyboardShouldPersist === false) {
            await Keyboard.dismiss();
        }
        this.props.onSearch && (await this.props.onSearch(this.state.keyword));
        this.props.afterSearch &&
        (await this.props.afterSearch(this.state.keyword));
    };
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

    input: {
        height: 30,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 15,
        borderColor: '#444',
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
        fontSize: 13
    },
    // placeholderColor:{  'grey' },
    iconSearch: {
        flex: 1,
        position: 'absolute',
        top: 14,
        height: 14,
        width: 14
    },
    iconSearchDefault: {
        tintColor: 'grey'
    },
    iconDelete: {
        position: 'absolute',
        right: 70,
        top: 14,
        height: 14,
        width: 14
    },
    iconDeleteDefault: {
        tintColor: 'grey'
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        width: 60,
        height: 50
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#fff'
    }

});