import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PubNubReact from 'pubnub-react';


export default () => {
  const pubnub = new PubNubReact({
    publishKey: 'pub-c-163f8330-fc72-4c1f-936a-f23c607791a0',
    subscribeKey: 'sub-c-95f75d54-7f33-11e9-bb42-f299c28bb8e7',
  });
  PushNotification.configure({
    // Called when Token is generated.
    onRegister(token) {
      console.log('TOKEN:', token);
    if (token.os === 'android') {
        pubnub.push.addChannels(
          {
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'gcm', // apns, gcm, mpns
          },
          (status) => {
            if (status.error) {
              console.log('Operation failed: ', status);
            } else {
              console.log('Operation done!');
            }
          },
        );
        // Send to Android from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
      }
    },
    // Called when a remote or local notification is opened or received.
    onNotification(notification) {
      console.log('Alert:', notification);
      // Do something with the notification.
      // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // ANDROID: GCM or FCM Sender ID
    senderID: '611889692650',
    popInitialNotification: true,
  });
};