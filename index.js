
import React, { Component } from 'react';
import { AppRegistry ,BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions,StackNavigator,TabNavigator } from "react-navigation";
import One from "./reactNavigation/One";
import Two from "./reactNavigation/Two";
import Three from "./reactNavigation/Three";

  import App from './App';
  import NetWorkStatus from './NetWorkStatus'
  import  WebViewDemo from './WebViewDemo'
//
global.SupplierCode = 'aaa';
const AppNavigation = TabNavigator(
    {
        Home: { screen: App },
        NetWorkStatus: { screen: NetWorkStatus },
        WebViewDemo: { screen: WebViewDemo }
    }
);
// AppRegistry.registerComponent('ReactNativeUpgradeDemo', () => ReduxNavigation);


const  Apps = StackNavigator({
    One:{screen:One},
    Two:{screen:AppNavigation},
    Two1:{screen:Two},
    Three:{screen:Three}
});
AppRegistry.registerComponent('ReactNativeUpgradeDemo',()=>Apps);
