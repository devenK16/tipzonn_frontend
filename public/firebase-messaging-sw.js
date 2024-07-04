importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDhciJ4W2LQNvCMgC5huHix-_mg6-xEX4s",
    authDomain: "tipzonn-notifacation.firebaseapp.com",
    projectId: "tipzonn-notifacation",
    storageBucket: "tipzonn-notifacation.appspot.com",
    messagingSenderId: "943744458624",
    appId: "1:943744458624:web:aa551380b3c05f531fab65",
    measurementId: "G-7YTPY1781D"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
