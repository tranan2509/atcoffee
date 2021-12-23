const admin = require('firebase-admin');
const express = require('express');
const app = express();

var serviceAccount = require('./atcoffeeapp-2f281-firebase-adminsdk-ntk5g-b759bca6e1.json');

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://atcoffeeapp-2f281-default-rtdb.firebaseio.com',
});

app.post('/send-noti', (req, res) => {
  console.log(req.body);
  const message = {
    notification: {
      title: 'Thông báo',
      body: req.body.message,
      //sound: 'default',
      //icon: 'https://res.cloudinary.com/tranan2509/image/upload/v1635433632/logo_hvnmwc.png',
    },
    android: {
      notification: {
        sound: 'default',
        icon: 'https://res.cloudinary.com/tranan2509/image/upload/v1635433632/logo_hvnmwc.png',
      },
    },
    token: req.body.token,
  };
  admin
    .messaging()
    .send(message)
    .then(res => {
      console.log('send Success');
    })
    .catch(err => {
      console.log(err);
    });
  res.send(true);
});

app.listen(3000, () => {
  console.log('server running');
});
//app.timeout = 120000; //
