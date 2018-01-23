package com.reactnativeupgradedemo;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by FUSHUAI on 2017/12/16.
 */

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private Context context;
    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
    }

    @Override
    public String getName(){
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    @ReactMethod
    public void startService(String UploadUri,Callback errorCallback, Callback successCallback){
//        Toast.makeText(context, "1", Toast.LENGTH_SHORT).show();
        MyService.UploadUri=UploadUri;
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class toActivity = Class.forName("com.reactnativeupgradedemo.MyService");
                Intent intent = new Intent(getReactApplicationContext(), toActivity);
//            intent.putExtra("params", params);
                context.startService(intent);
                successCallback.invoke("success:"+MyService.str);
            }
        } catch (Exception ex){  errorCallback.invoke("error:"+ex.toString());}

    }
    @ReactMethod
    public  void  getService(Callback successCallback){
        try {
            successCallback.invoke(MyService.str + MyService.i+"---------"+MyService.httpresult);
        }catch (Exception ex){successCallback.invoke("error");}
    }

}
