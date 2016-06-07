package com.mobile;

import android.app.Application;

import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.kakao.auth.AuthType;
import com.kakao.auth.Session;


/**
 * Created by Rooney on 16. 6. 1..
 */
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        Session.initialize(this, AuthType.KAKAO_TALK);
    }
}
