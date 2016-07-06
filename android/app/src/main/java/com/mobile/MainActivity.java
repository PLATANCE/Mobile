package com.mobile;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;


import java.util.Arrays;
import java.util.List;

// mixpanel
import com.kevinejohn.RNMixpanel.*;

// pushnotification
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

// fabric
import com.mobile.reactpackage.AlertReactPackage;
import com.mobile.reactpackage.CommunicationReactPackage;
import com.mobile.reactpackage.KakaoReactPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

// device info
import com.learnium.RNDeviceInfo.RNDeviceInfo;

//facebook sdk
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

public class MainActivity extends ReactActivity {
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;
    CallbackManager mCallbackManager;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
    }
    @Override
    protected String getMainComponentName() {
        return "Mobile";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);
        mCallbackManager = new CallbackManager.Factory().create();

        return Arrays.<ReactPackage>asList(
                new FabricPackage(this),
            new RNMixpanel(),
            new RealmReactPackage(),
            new RNDeviceInfo(),
            mReactNativePushNotificationPackage,
            new FBSDKPackage(mCallbackManager),
                new KakaoReactPackage(),
            new MainReactPackage(),
                new AlertReactPackage(),
                new CommunicationReactPackage()
        );
    }

    @Override
    protected void onNewIntent (Intent intent) {
        super.onNewIntent(intent);
        mReactNativePushNotificationPackage.newIntent(intent);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
