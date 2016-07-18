package com.plating;
import android.app.Activity;
import android.app.Application;
import android.content.Intent;

import com.crashlytics.android.Crashlytics;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.kakao.auth.KakaoSDK;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.plating.reactpackage.AlertReactPackage;
import com.plating.reactpackage.CommunicationReactPackage;
import com.plating.reactpackage.KakaoReactPackage;
import com.smixx.fabric.FabricPackage;

import java.util.Arrays;
import java.util.List;

import io.fabric.sdk.android.Fabric;
import io.realm.react.RealmReactPackage;

/**
 * Created by Rooney on 16. 6. 1..
 */
public class MainApplication extends Application implements ReactApplication {
    private static volatile MainApplication instance = null;
    private static volatile Activity currentActivity = null;
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;
    private static CallbackManager mCallbackManager = new CallbackManager.Factory().create();
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage();
            return Arrays.<ReactPackage>asList(
                    new FabricPackage(),
                    new RNMixpanel(),
                    new RealmReactPackage(),
                    new RNDeviceInfo(),
                    mReactNativePushNotificationPackage,
                    new FBSDKPackage(mCallbackManager),
                    new KakaoReactPackage(),
                    new AlertReactPackage(),
                    new CommunicationReactPackage(),
                    new MainReactPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
    @Override
    public void onCreate() {
        super.onCreate();
        Fabric.with(this, new Crashlytics());
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
        instance = this;
        KakaoSDK.init(new KakaoSDKAdapter());
    }

    public void onNewIntent (Intent intent) {
        mReactNativePushNotificationPackage.newIntent(intent);
    }

    public static void setCurrentActivity(Activity currentActivity) {
        MainApplication.currentActivity = currentActivity;
    }

    public static Activity getCurrentActivity() {
        return currentActivity;
    }

    public static MainApplication getMainApplicationContext() {
        if(instance == null)
            throw new IllegalStateException("this application does not inherit com.kakao.MainApplication");
        return instance;
    }

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

}
