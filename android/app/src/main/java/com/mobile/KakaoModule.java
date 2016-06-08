package com.mobile;

import android.content.pm.PackageInstaller;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kakao.auth.ISessionCallback;
import com.kakao.auth.Session;
import com.kakao.network.ErrorResult;
import com.kakao.usermgmt.UserManagement;
import com.kakao.usermgmt.callback.MeResponseCallback;
import com.kakao.usermgmt.response.model.UserProfile;
import com.kakao.util.exception.KakaoException;

/**
 * Created by Rooney on 16. 6. 7..
 */
public class KakaoModule extends ReactContextBaseJavaModule {

    public KakaoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "KakaoLogin";
    }

    @ReactMethod
    public void show() {
        Log.d("KakaoModule", "show");
        /*
        UserManagement.requestMe(new MeResponseCallback() {
            @Override
            public void onSessionClosed(ErrorResult errorResult) {
                Log.d("KakaoModule", "onSessionClosed:" + errorResult.toString());
            }

            @Override
            public void onNotSignedUp() {
                Log.d("KakaoModule", "onNotSignedUp");
            }

            @Override
            public void onSuccess(UserProfile result) {
                Log.d("KakaoModule", "onSuccess: " + result.toString());
            }
        });
        */
    }
}
