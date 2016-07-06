package com.mobile.module;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInstaller;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.CallbackManager;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.kakao.auth.AuthType;
import com.kakao.auth.ISessionCallback;
import com.kakao.auth.Session;
import com.kakao.network.ErrorResult;
import com.kakao.usermgmt.UserManagement;
import com.kakao.usermgmt.callback.MeResponseCallback;
import com.kakao.usermgmt.response.model.UserProfile;
import com.kakao.util.exception.KakaoException;
import com.mobile.LoginActivity;

import java.util.Map;

/**
 * Created by Rooney on 16. 6. 7..
 */
public class KakaoModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final int REQUEST_CODE = 467801;

    private ISessionCallback mKakaocallback;
    private Promise mPromise;
    public KakaoModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // Add the listener for 'onActivityResult'
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "KakaoManager";
    }

    @ReactMethod
    public void toast() {
        Toast.makeText(getReactApplicationContext(), "12345", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void login(final Promise promise) {
        Toast.makeText(getReactApplicationContext(), "카톡 로그인 시작!", Toast.LENGTH_SHORT).show();
        Activity currentActivity = getCurrentActivity();
        if(currentActivity == null) {
            promise.reject("E_ACTIVITY_DOES_NOT_EXIST");
            Log.d("MainActivity", "E_ACTIVITY_DOES_NOT_EXIST");
            return;
        }
        mPromise = promise;
        try {
            //Session.getCurrentSession().open(AuthType.KAKAO_TALK, getCurrentActivity());
            final Intent intent = new Intent(currentActivity, LoginActivity.class);
            currentActivity.startActivityForResult(intent, REQUEST_CODE);
        } catch (Exception e) {
            mPromise.reject("E_FAILED_TO_SHOW_DATA", e.toString());
            Log.d("MainActivity", "E_FAILED_TO_SHOW_DATA" + e.toString());
            e = null;
        }

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d("MainActivity", "onActivityResult: requestCode: " + requestCode + "resultCode: " + resultCode + "data" + data.toString());
        if(requestCode == REQUEST_CODE) {
            if(mPromise != null) {
                if(resultCode == Activity.RESULT_CANCELED) {
                    mPromise.reject("E_DATA_CANCELED", "data canceled");
                    Log.d("MainActivity", "E_DATA_CANCELED");
                } else if(resultCode == Activity.RESULT_OK) {
                    Bundle bundle = data.getExtras();
                    if(bundle == null) {
                        Log.d("MainActivity", "NO DATA FOUND");
                        mPromise.reject("NO DATA FOUND");
                    } else {
                        Log.d("MainActivity", bundle.getLong("ID") + "");
                        Log.d("MainActivity", bundle.getString("nickname"));
                        Log.d("MainActivity", bundle.getString("profile_image"));
                        Log.d("MainActivity", bundle.getString("thumbnail_image"));

                        WritableMap map = Arguments.createMap();
                        WritableMap propertiesMap = Arguments.createMap();
                        map.putDouble("ID", bundle.getLong("ID"));
                        propertiesMap.putString("nickname", bundle.getString("nickname"));
                        propertiesMap.putString("profile_image", bundle.getString("profile_image"));
                        propertiesMap.putString("thumbnail_image", bundle.getString("thumbnail_image"));
                        map.putMap("properties", propertiesMap);
                        mPromise.resolve(map);
                    }
                }
            }
        }
    }
}
