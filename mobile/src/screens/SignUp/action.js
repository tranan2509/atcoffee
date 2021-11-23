import apiServer from '../../api/apiServer';

export const SIGN_UP = 'SIGN_UP';
export const ERROR_SIGN_UP = 'ERROR_SIGN_UP';

export const signUp = (name, gender, phone, email, password, address) => {
  return async dispatch => {
    try {
      let image;
      //let yourGender;
      if (gender === 'Nam') {
        image =
          'https://res.cloudinary.com/tranan2509/image/upload/v1637334237/male_d5nb3t.jpg';
        //yourGender = 'Nam';
      } else if (gender === 'Nữ') {
        image =
          'https://res.cloudinary.com/tranan2509/image/upload/v1637334237/fmale_hus1yd.jpg';
        //yourGender = 'Nữ';
      } else {
        image =
          'https://res.cloudinary.com/tranan2509/image/upload/v1635433632/logo_hvnmwc.png';
        //yourGender = 'Khác';
      }
      user = {
        username: phone,
        password: password,
        code: phone,
        image: image,
        name: name,
        phone: phone,
        gender: gender,
        email: email,
        address: address,
        dob: new Date(),
        identityCard: 0,
        storeId: 0,
        accumulatedPoints: 0,
        currentPoints: 0,
        typeId: 3,
        roleName: 'USER',
        state: true,
      };

      let data = new FormData();
      data.append('user', JSON.stringify(user));
      console.log('user', user);
      const res = await apiServer.post('/api/info/user', data);
      dispatch({type: SIGN_UP, payload: res.data});
    } catch (err) {
      console.log('This is error in action Sign Up', err);
      dispatch({type: ERROR_SIGN_UP, error: err});
    }
  };
};
