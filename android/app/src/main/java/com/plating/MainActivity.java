package com.plating;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.facebook.react.bridge.NativeModuleRegistry;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
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
import com.plating.reactpackage.AlertReactPackage;
import com.plating.reactpackage.CommunicationReactPackage;
import com.plating.reactpackage.KakaoReactPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

// device info
import com.learnium.RNDeviceInfo.RNDeviceInfo;

//facebook sdk
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "Mobile";
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
