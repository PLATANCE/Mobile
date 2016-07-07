package com.plating;
import android.app.Activity;
import android.app.Application;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.kakao.auth.KakaoSDK;

/**
 * Created by Rooney on 16. 6. 1..
 */
public class MyApplication extends Application {
    private static volatile MyApplication instance = null;
    private static volatile Activity currentActivity = null;
    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        instance = this;
        KakaoSDK.init(new KakaoSDKAdapter());
    }

    public static void setCurrentActivity(Activity currentActivity) {
        MyApplication.currentActivity = currentActivity;
    }

    public static Activity getCurrentActivity() {
        return currentActivity;
    }

    public static MyApplication getMyApplicationContext() {
        if(instance == null)
            throw new IllegalStateException("this application does not inherit com.kakao.MyApplication");
        return instance;
    }
}
