package com.plating.module;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Rooney on 16. 7. 6..
 */
public class CommunicationModule extends ReactContextBaseJavaModule {



    public CommunicationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CommunicationsAndroid";
    }

    @ReactMethod
    public void text(String url) {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.putExtra("sms_body", url);
        intent.setType("vnd.android-dir/mms-sms");
        currentActivity.startActivity(intent);
    }
}
