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
  //   const message = {
  //     notification: {
  //       title: 'Thông báo',
  //       body: 'Đơn hàng của bạn đã hoàn thành. Vui lòng nhận hàng ạ!!!',
  //     },
  //     token:
  //       'dc3oorhUQMOAArV8SO1OmB:APA91bHIXhbFqNFIZnXHVKoSh4wGf4pAUhvuqXFXx6oGqtII77UBwf1h0yPMve1bNcfOkrTytlmBtM8TuBfkdDNMdlrEay6eCeekjRDfc3mxY7vqXm2Cgqxpgy4QZXcToneg6WyRVKOP',
  //   };
  //   admin
  //     .messaging()
  //     .send(message)
  //     .then(res => {
  //       console.log('send Success');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
});

app.listen(3000, () => {
  console.log('server running');
});
