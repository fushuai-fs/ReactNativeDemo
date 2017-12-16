package com.reactnativeupgradedemo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by FUSHUAI on 2017/12/16.
 */

public class AnExampleReactPackage implements ReactPackage {
//    public class AnExampleReactPackage extends MainReactPackage {
        /**
     * @param reactContext react application context that can be used to create modules
     * @return list of native modules to register with the newly created catalyst instance
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        //new an Array intstead of abstract List exception
        List<NativeModule> result = new ArrayList<>();
        result.add(new ToastModule(reactContext));
        return result;
    }


    /**
     * @param reactContext
     * @return a list of view managers that should be registered with {@link }
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
