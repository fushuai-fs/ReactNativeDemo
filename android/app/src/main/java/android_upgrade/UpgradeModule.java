package android_upgrade;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Song on 2017/7/10.
 */
public class UpgradeModule extends ReactContextBaseJavaModule {

    private Context context;

    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "upgrade";
    }

    //要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。方法的返回类型必须为void.React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件
    @ReactMethod
    public void upgrade(String apkUrl) {
        UpdateDialog.goToDownload(context, apkUrl);
    }
    @ReactMethod
    public void hello(String apkUrl) {
        Toast.makeText(getReactApplicationContext(), apkUrl, Toast.LENGTH_LONG).show();
    }
}
