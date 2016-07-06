package com.mobile;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.kakao.auth.AuthType;
import com.kakao.auth.ISessionCallback;
import com.kakao.auth.Session;
import com.kakao.network.ErrorResult;
import com.kakao.usermgmt.UserManagement;
import com.kakao.usermgmt.callback.MeResponseCallback;
import com.kakao.usermgmt.response.model.UserProfile;
import com.kakao.util.exception.KakaoException;


/**
 * Created by home on 16. 6. 15..
 */
public class LoginActivity extends Activity {
    private SessionCallback callback;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        callback = new SessionCallback();
        Session.getCurrentSession().addCallback(callback);
        Session.getCurrentSession().checkAndImplicitOpen();
        Session.getCurrentSession().open(AuthType.KAKAO_TALK, this);
    }
    /*
     * 로그인 버튼을 클릭 했을 시 access token을 요청하도록 설정한다
     */
    private class SessionCallback implements ISessionCallback {
        @Override
        public void onSessionOpened() {
            Log.d("MainActivity", "onSessionOpened");
            UserManagement.requestMe(new MeResponseCallback() {
                @Override
                public void onSessionClosed(ErrorResult errorResult) {
                    Log.d("MainActivity", "onSessionClosed:" + errorResult.toString());
                    Intent intent = new Intent();
                    setResult(RESULT_CANCELED, intent);
                    finish();
                }

                @Override
                public void onNotSignedUp() {
                    Log.d("MainActivity", "onNotSignedUp");
                }

                @Override
                public void onSuccess(UserProfile result) {
                    Log.d("MainActivity", "onSuccess: " + result.toString());
                    Intent intent = new Intent();
                    intent.putExtra("ID", result.getId());
                    intent.putExtra("nickname", result.getNickname());
                    intent.putExtra("profile_image", result.getProfileImagePath());
                    intent.putExtra("thumbnail_image", result.getThumbnailImagePath());
                    setResult(RESULT_OK, intent);
                    finish();
                }
            });
        }

        @Override
        public void onSessionOpenFailed(KakaoException exception) {
            Log.d("MainActivity", "onSessionOpenFailed");
            Intent intent = new Intent();
            setResult(RESULT_CANCELED, intent);
            finish();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (Session.getCurrentSession().handleActivityResult(requestCode, resultCode, data)) {
            return;
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Session.getCurrentSession().removeCallback(callback);
    }
}
