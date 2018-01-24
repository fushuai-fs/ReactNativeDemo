package com.reactnativeupgradedemo;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Binder;
import android.os.Bundle;
import android.os.IBinder;
import android.widget.Toast;

import java.io.IOException;
import java.lang.Thread;
import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import RNDevice.RNDeviceModule;
import okhttp3.FormBody;
import okhttp3.Request;

public class MyService extends Service {
    public MyService() {
        // 第二个参数为首次执行的延时时间，第三个参数为定时执行的间隔时间
//        service.scheduleAtFixedRate(runnable, 10, 10, TimeUnit.SECONDS);

    }

//    ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
//Runnable runnable = new Runnable() {
    //        @Override
//        public void run() {
//            i++;
//        }
//    };
    public static  int i=0;
    public  static String str="";
    public  static String httpresult="";
    private IBinder binder=new MyService.LocalBinder();

    //定位都要通过LocationManager这个类实现
    private LocationManager locationManager;
    private String provider;
    private String UploadUri="";
//   private Thread thread = new Thread(new Runnable() {
//        @Override
//        public void run() {
////          str +="locationService";
////            Toast.makeText(getApplicationContext(),"locationService", Toast.LENGTH_LONG).show();
//
//
//        }
//    });

   private void locationService(){
       try {
           //  获取的是位置服务
           String serviceString = Context.LOCATION_SERVICE;
           //  调用getSystemService()方法来获取LocationManager对象
           locationManager = (LocationManager) getSystemService(serviceString);
           //获取当前可用的位置控制器
           List<String> list = locationManager.getProviders(true);
           if (list.contains(LocationManager.GPS_PROVIDER)) {
               //是否为GPS位置控制器
               provider = LocationManager.GPS_PROVIDER;
           }
           else if (list.contains(LocationManager.NETWORK_PROVIDER)) {
               //是否为网络位置控制器
               provider = LocationManager.NETWORK_PROVIDER;

           } else {
//               Toast.makeText(getApplicationContext(), "请检查网络或GPS是否打开", Toast.LENGTH_LONG).show();
               str +="请检查网络或GPS是否打开";
               return;
           }
         Location location = locationManager.getLastKnownLocation(provider);
           if (location != null) {
               //获取当前位置，这里只用到了经纬度
                 str += ",经度为："  + location.getLongitude()+ "纬度为：" + location.getLatitude() ;
//               Toast.makeText(getApplicationContext(),str, Toast.LENGTH_LONG).show();
//               UploadLocation(String.valueOf(location.getLongitude()),String.valueOf(location.getLatitude()));
           }

           //绑定定位事件，监听位置是否改变
//第一个参数为控制器类型
// 第二个参数为监听位置变化的时间间隔（单位：毫秒）
//第三个参数为位置变化的间隔（单位：米）第四个参数为位置监听器
        locationManager.requestLocationUpdates(provider, 5000, 2,  locationListener);
       }
       catch (Exception ex)
       {
          str += "Exception"+ ex.toString();
           // Toast.makeText(getApplicationContext(),ex.toString(), Toast.LENGTH_LONG).show();
       }
    }

    LocationListener locationListener = new LocationListener() {

        @Override
        public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
            // TODO Auto-generated method stub

        }

        @Override
        public void onProviderEnabled(String enabled) {
            // TODO Auto-generated method stub

        }

        @Override
        public void onProviderDisabled(String disabled) {
            // TODO Auto-generated method stub

        }

        @Override
        public void onLocationChanged(Location location) {
            // TODO Auto-generated method stub
            // 更新当前经纬度
            try {
                if (location != null) {
                    //获取当前位置，这里只用到了经纬度
                    str += "纬度为：" + location.getLatitude() + ",经度为："
                            + location.getLongitude();
                    UploadLocation(String.valueOf(location.getLongitude()),String.valueOf(location.getLatitude()));
//                    httpresult+=UploadUri;
                }
            }catch (Exception ex){str+="update"+ex.toString();}
        }
    };

    public void UploadLocation(String Longitude,String Latitude)
    {
        DateFormat df = DateFormat.getDateTimeInstance();
        FormBody formBody = new FormBody.Builder().add("DeviceID", "test")
                .add("Longitude", Longitude)
                .add("Latitude", Latitude)
                .add("Mark", String.valueOf(i))
                .add("date", df.format(new Date()))
                .build();
        try{
            httpresult+=UploadUri;//"http://172.16.2.162/api/Position/Post"
            OkHttpHelper.getInstance().asyncPost(UploadUri, formBody, new OkHttpHelper.HttpCallBack() {
                @Override
                public void onError(Request request, IOException e) {
                    httpresult += e.toString();
                }

                @Override
                public void onSuccess(Request request, String result) {
//                    httpresult+="Success";
                }
            });
        }
        catch (Exception e){httpresult+="异常"+e.toString();}

    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        return binder;
    }

    @Override
    public void onCreate() {
        str+="OnCreate";
        locationService();
        super.onCreate();
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // 必须检查intent是否为空
        // 因为 intent的参数是null的原因是这个intent参数是通过startService(Intent)方法所传递过来的，
        // 但是如果Service在你的进程退出后有可能被系统自动重启，这个时候intent就会是null.
        //  http://blog.csdn.net/luohai859/article/details/50685418
        if(intent!=null) {
            this.UploadUri = intent.getStringExtra("UploadUri");
        }

//        str+=thread.getState().toString();
//        switch (thread.getState())
//        {
//            case NEW:
//                thread.start();
//                break;
//            case TERMINATED:
//                thread.start();
//                break;
//            case RUNNABLE:
//                thread.notify();
//                break;
//            case BLOCKED:
//                thread.notify();
//                break;
//            case WAITING :break;
//            case TIMED_WAITING :break;
//        }
//        str+=thread.getState().toString();
        return super.onStartCommand(intent, flags, startId);

    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        if (locationManager != null) {
            locationManager.removeUpdates(locationListener);
        }
       this.stopSelf();
    }

    //定义内容类继承Binder
    public class LocalBinder extends Binder {
        //返回本地服务
        MyService getService(){
            return MyService.this;
        }
    }
}
