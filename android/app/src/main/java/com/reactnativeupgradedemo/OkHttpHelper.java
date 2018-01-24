package com.reactnativeupgradedemo;


import android.os.Handler;
import android.os.Looper;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by fus on 2018/01/19.
 *
 FormBody formBody = new FormBody.Builder().add("username", "lesiefang").add("age", "28").build();
 MyOkHttpClient.getInstance().asyncPost("http://192.168.94.131:5000/aaa/", formBody, new MyOkHttpClient.HttpCallBack() {
@Override
public void onError(Request request, IOException e) {
Log.d("aaa", e.toString());
}

@Override
public void onSuccess(Request request, String result) {
textView.setText(result);
}
});
 */

public class OkHttpHelper {

    private static OkHttpHelper myOkHttpClient;
    private OkHttpClient okHttpClient;
    private Handler handler;

    private OkHttpHelper() {
        okHttpClient = new OkHttpClient();
        handler = new Handler(Looper.getMainLooper());
    }

    public static OkHttpHelper getInstance() {
        if (myOkHttpClient == null) {
            synchronized (OkHttpHelper.class) {
                if (myOkHttpClient == null) {
                    myOkHttpClient = new OkHttpHelper();
                }
            }
        }
        return myOkHttpClient;
    }
    public void asyncGet(String url, HttpCallBack httpCallBack) {
        Request request = new Request.Builder().url(url).build();
        okHttpClient.newCall(request).enqueue(new StringCallBack(request, httpCallBack));
    }

    public void asyncPost(String url, FormBody formBody, HttpCallBack httpCallBack) {
        Request request = new Request.Builder().url(url).post(formBody).build();
        okHttpClient.newCall(request).enqueue(new StringCallBack(request, httpCallBack));
    }



    public interface HttpCallBack {
        void onError(Request request, IOException e);

        void onSuccess(Request request, String result);
    }
    class StringCallBack implements Callback {
        private HttpCallBack httpCallBack;
        private Request request;

        public StringCallBack(Request request, HttpCallBack httpCallBack) {
            this.request = request;
            this.httpCallBack = httpCallBack;
        }
        @Override
        public void onFailure(Call call, IOException e) {
            final IOException fe = e;
            MyService.httpresult+="%%"+e.toString()+"%%";
            if (httpCallBack != null) {
                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        httpCallBack.onError(request, fe);
                    }
                });
            }
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {
            final String result = response.body().string();
            MyService.httpresult+="%%"+result+"%%";
            if (httpCallBack != null) {
                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        httpCallBack.onSuccess(request, result);
                    }
                });
            }
        }
    }
}

