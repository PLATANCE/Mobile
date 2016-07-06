package com.mobile;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.text.InputType;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Rooney on 16. 7. 5..
 */
public class AlertModule extends ReactContextBaseJavaModule {
    private Callback callback;
    public AlertModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AlertAndroid";
    }

    @ReactMethod
    public void prompt(String title, String message, String negativeText, String positiveText, final Callback positiveCallback) {

        final InputMethodManager inputMethodManager = (InputMethodManager) getReactApplicationContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle(title);
        builder.setMessage(message);
        // Set up the input
        final EditText input = new EditText(getCurrentActivity());
        // Specify the type of input expected; this, for example, sets the input as a password, and will mask the text
        input.setInputType(InputType.TYPE_CLASS_TEXT);
        builder.setView(input);

        // Set up the buttons
        builder.setPositiveButton(positiveText, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String m_Text = input.getText().toString();
                Toast.makeText(getReactApplicationContext(), m_Text, Toast.LENGTH_SHORT).show();
                inputMethodManager.hideSoftInputFromWindow(input.getWindowToken(), 0);
                positiveCallback.invoke(m_Text);
                //mPromise.resolve(m_Text);
            }
        });
        builder.setNegativeButton(negativeText, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                inputMethodManager.hideSoftInputFromWindow(input.getWindowToken(), 0);
                dialog.cancel();
            }
        });

        builder.show();
        input.requestFocus();
        inputMethodManager.toggleSoftInput(InputMethodManager.SHOW_FORCED, 0);
    }
}
