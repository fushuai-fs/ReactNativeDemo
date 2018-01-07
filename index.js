
import React, { Component } from 'react';
import { AppRegistry ,BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions,TabNavigator } from "react-navigation";

import App from './App';
import NetWorkStatus from './NetWorkStatus'
import  WebViewDemo from './WebViewDemo'

const AppNavigation = TabNavigator(
    {
        Home: { screen: App },
        NetWorkStatus: { screen: NetWorkStatus },
        WebViewDemo: { screen: WebViewDemo }
    }
);
 export default class ReduxNavigation extends Component<{}> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return <AppNavigation navigation={navigation} />;
    }
}

AppRegistry.registerComponent('ReactNativeUpgradeDemo', () => ReduxNavigation);
