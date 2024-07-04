import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDhciJ4W2LQNvCMgC5huHix-_mg6-xEX4s",
    authDomain: "tipzonn-notifacation.firebaseapp.com",
    projectId: "tipzonn-notifacation",
    storageBucket: "tipzonn-notifacation.appspot.com",
    messagingSenderId: "943744458624",
    appId: "1:943744458624:web:aa551380b3c05f531fab65",
    measurementId: "G-7YTPY1781D"
};

const app = initializeApp(firebaseConfig);
let messaging;

const initializeMessaging = async () => {
  if (await isSupported()) {
    messaging = getMessaging(app);
    return true;
  }
  console.log("Firebase Messaging is not supported in this browser");
  return false;
};

const requestFirebaseNotificationPermission = async () => {
  if (!await initializeMessaging()) {
    console.log("Messaging not supported, cannot request permission");
    return;
  }

  try {
    const token = await getToken(messaging, { vapidKey: 'BAfSLwJLOhHZZyGIbJwq-Hq0gp-qEKhEuRy_3OV1H8897G6P9nBNWsIjVIweWjlEzptZAYvVTqu' });
    if (token) {
      console.log('FCM Token:', token);
      // Send token to the backend to store it
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};

const onMessageListener = () => new Promise((resolve) => {
  if (!messaging) {
    console.log("Messaging not initialized, cannot listen for messages");
    resolve(null);
    return;
  }
  onMessage(messaging, (payload) => {
    resolve(payload);
  });
});

export { requestFirebaseNotificationPermission, onMessageListener };