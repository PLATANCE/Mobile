package com.plating.module;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.kakao.kakaolink.AppActionBuilder;
import com.kakao.kakaolink.AppActionInfoBuilder;
import com.kakao.kakaolink.KakaoLink;
import com.kakao.kakaolink.KakaoTalkLinkMessageBuilder;
import com.kakao.util.KakaoParameterException;
import com.plating.LoginActivity;

/**
 * Created by Rooney on 16. 6. 7..
 */
public class KakaoModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final int REQUEST_CODE = 467801;
    private Promise mPromise;

    public KakaoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "KakaoManager";
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
            final Intent intent = new Intent(currentActivity, LoginActivity.class);
            currentActivity.startActivityForResult(intent, REQUEST_CODE);
        } catch (Exception e) {
            mPromise.reject("E_FAILED_TO_SHOW_DATA", e.toString());
            Log.d("MainActivity", "E_FAILED_TO_SHOW_DATA" + e.toString());
            mPromise = null;
        }
    }

    @ReactMethod
    public void openKakaoTalkAppLink(String title, String content) {
        Activity currentActivity = getCurrentActivity();
        try {
            KakaoLink kakaoLink = KakaoLink.getKakaoLink(currentActivity);
            final KakaoTalkLinkMessageBuilder kakaoTalkLinkMessageBuilder = kakaoLink.createKakaoTalkLinkMessageBuilder();
            kakaoTalkLinkMessageBuilder.addText(content);
            kakaoTalkLinkMessageBuilder.addAppButton(title,
                    new AppActionBuilder().addActionInfo(AppActionInfoBuilder.createAndroidActionInfoBuilder()
                            .setMarketParam("referrer=kakaotalklink")
                            .build())
                            .addActionInfo(AppActionInfoBuilder.createiOSActionInfoBuilder()
                                    .build())
                            .setUrl("http://www.plating.co.kr") // PC 카카오톡 에서 사용하게 될 웹사이트 주소
                            .build());
            kakaoLink.sendMessage(kakaoTalkLinkMessageBuilder, currentActivity);
        } catch (KakaoParameterException e) {
            e.printStackTrace();
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
