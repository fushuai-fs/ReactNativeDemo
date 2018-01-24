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
import momnet from 'moment'
 // import Search from 'react-native-search-box'
import Search from '../Search'
import InputComponent from '../Components/InputComponent'
import  AppExample from '../AnimatedExample'

import Json from '../Utility/JsonUtility'
import Storage from '../Utility/StorageUtility'

const { width } = Dimensions.get('window');

export default class One extends Component<{}> {
    constructor (props) {
        super (props)
        this.state = {
             text:1,jsonstr:'',
            longitude:0,
            latitude:0,
            error:'',
            date:'',
            uploadUri:''
        }
    }
    // render() 方法前运行
    componentWillMount() {
        // const jsonstr = '{"msg":"msg0","result":1}';
        // const jsonData = Json.strToJson(jsonstr);
        // Storage.save('json', jsonData, () => {
        // })
        //
        // Storage.get('json', (err, json) => {
        //     this.setState({jsonstr: Json.jsonToStr(json)});
        // });
        // this.timer = setInterval(() => {
        //     this.uploadPosition(this.state.longitude, this.state.latitude);
        // }, 1000);
// alert(GlobalProps.UploadPosition);
        NativeModules.ToastExample.startService(GlobalProps.UploadPosition,
            (error) => {
                   alert("error:"+error);
            },//{this.setState({error:error});},
            (success) => {
                  alert(success);
            }//{this.setState({error:success});}
        );

    }


    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(prevState => ({
                date: new Date()
            }));
                                }, 1000);
        this.timer2 = setInterval(() => {
           // this.getPosition();
            NativeModules.ToastExample.getService((text) => {
                this.setState(prevState => ({
                    error:text,
                    longitude:0,
                    latitude:0,
                    date: new Date()
                }));
        });

    }, 10000);
        this.timer3 = setInterval(()=>{
            NativeModules.ToastExample.getServiceUri((txt)=>{
                this.setState(prevState => ({
                    uploadUri:txt
                }));
            });
        },5000);
        // const jsons = Storage.get('json');
        // // alert(Json.jsonToStr(jsons));
        // this.setState({ jsonstr:Json.jsonToStr(jsons) });
        // this.getPosition();
       // this.timer = setInterval(()=>this.getPosition(),1000);
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer); // 如果不清除再次唤起页面会现2次执行
        this.timer2 && clearTimeout(this.timer2);
        this.timer3 && clearTimeout(this.timer3);
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
        // const jsonstr='{"msg":"msg0","result":1}';
        // const jsonData=Json.strToJson(jsonstr);
       // alert(jsons);
        return (
            <View style={styles.container}>
                {/*<Text>{Json.jsonToStr(jsonData)}</Text>*/}
                {/*<Text> {jsonData.result+1}</Text>*/}

                {/*<Text>{this.state.jsonstr}</Text>*/}
                <Text>longitude:{this.state.longitude}</Text>
                <Text>latitude:{this.state.latitude}</Text>
                <Text>{this.state.error}</Text>
                <Text>datetime:{momnet(this.state.date).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text>{this.state.uploadUri}</Text>

                {/*<InputComponent ref={'test'}/>*/}
                {/*<AppExample/>*/}

                {/*<Search*/}
                    {/*ref="search_box" cancelTitle={'取消'} contentWidth={width-20} onSearch={()=>this.onSearchOne()}/>*/}
                {/*<Text>Welcome to React Native! One</Text>*/}

                <Button title='Go to Two' onPress={()=>this.btnclick()}/>
                {/*<Button title='Go to Two not back' onPress={()=>this.btnclicknotback()}/>*/}

                {/*<Text>{global.SupplierCode }</Text>*/}

                {/*<TextInput ref={'input_keyword'} style={{width:width-20}}>*/}
                    {/*<TouchableWithoutFeedback onPress={this.onFocus}>*/}
                        {/*{this.props.iconSearch*/}
                            {/*? <Animated.View*/}
                                {/*style={[styles.iconSearch, { left: this.iconSearchAnimated }]}*/}
                            {/*>*/}
                                {/*{this.props.iconSearch}*/}
                            {/*</Animated.View>*/}
                            {/*: <Animated.Image*/}
                                {/*source={require('../img/search.png')}*/}
                                {/*style={[*/}
                                    {/*styles.iconSearch,*/}
                                    {/*styles.iconSearchDefault,*/}
                                    {/*this.props.tintColorSearch && {*/}
                                        {/*tintColor: this.props.tintColorSearch*/}
                                    {/*},*/}
                                    {/*{*/}
                                        {/*left: this.iconSearchAnimated*/}
                                    {/*}*/}
                                {/*]}*/}
                            {/*/>}*/}
                    {/*</TouchableWithoutFeedback>*/}
                {/*</TextInput>*/}




            </View>
        );
    }
    /** 获取地理位置（经纬度） */
    getPosition = (): void => {
        this.setState(prevState => ({
            error:'',
            longitude:0,
            latitude:0,
            date: new Date()
        }));
        /** 获取地理位置 */
        navigator.geolocation.getCurrentPosition(
            (position: any) => {
                // console.warn('成功：' + JSON.stringify(position));
                const positionData: any = position.coords;
                // 经度：positionData.longitude
                // 纬度：positionData.latitude
                // 最后一步 todo：高德 || 百度地图逆地理编码转~~具体就是调个接口把经纬度丢进去就行了
// alert(positionData.longitude+'--'+positionData.latitude);
                this.setState({
                    longitude:positionData.longitude,
                    latitude:positionData.latitude
                });
  // this.uploadPosition(positionData.longitude,positionData.latitude);

            },
            (error: any) => {
               // alert('失败：' + JSON.stringify(error.message))
                this.setState({
                    error:'失败：' + JSON.stringify(error.message)
                });
            }, {
                // 提高精确度，但是获取的速度会慢一点
                enableHighAccuracy: false,
                // 设置获取超时的时间20秒
                timeout: 20000,
                // 示应用程序的缓存时间，每次请求都是立即去获取一个全新的对象内容
                maximumAge: 10000
            }
        );
    }

    /*
      经度：longitude
      纬度：latitude
    * */
    uploadPosition(longitude,latitude){
        this.setState(prevState => ({
            date: new Date()
        }));
        fetch(GlobalProps.UploadPosition, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'Method=Position&longitude='+longitude+'&latitude='+latitude+'&Mark=mar&date='+momnet(this.state.date).format('YYYY-MM-DD HH:mm:ss')
        })
            // .then((response)=>response.json())
            .then((data)=>{
            })
            .catch(function (error) {
                this.setState({
                    error:'failed：' + error
                });
                //alert('Request failed\r\n'+ error);
            });
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
        // Storage.get('json',(err,json)=>{ alert(json);
        //     this.setState({ jsonstr:Json.jsonToStr(json)+'123123' });
        // });

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