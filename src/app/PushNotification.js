import PushNotification from 'react-native-push-notification';

PushNotification.configure({
 
    // (optional) Called when Token is generated (iOS and Android) 
    onRegister: function(result) {
        console.log( 'TOKEN:', result.token );
        module.exports.deviceToken = result.token;
    },
 
    // (required) Called when a remote or local notification is opened or received 
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    /*
     * 안드로이드 적용 시 설정을 하셔야 합니다.
     * https://www.npmjs.com/package/react-native-push-notification
     */
 
    // ANDROID ONLY: (optional) GCM Sender ID. 
    //senderID: "YOUR GCM SENDER ID"
});
