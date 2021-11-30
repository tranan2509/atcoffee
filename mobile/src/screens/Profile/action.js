import apiServer from '../../api/apiServer';
import * as RootNavigation from '../../navigation/navigationRef';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ERROR_EDIT = 'ERROR_EDIT';

export const editProfile = (
  id,
  name,
  gender,
  phone,
  idCard,
  email,
  password,
  address,
  dob,
  accumulatedPoints,
  currentPoints,
) => {
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
        id: id,
        username: phone,
        password: password,
        code: phone,
        image: image,
        name: name,
        phone: phone,
        gender: gender,
        email: email,
        address: address,
        dob: dob,
        identityCard: idCard,
        storeId: 1,
        accumulatedPoints: accumulatedPoints,
        currentPoints: currentPoints,
        typeId: 1,
        roleName: 'USER',
        state: true,
      };
      let data = new FormData();
      data.append('user', JSON.stringify(user));
      const res = await apiServer.put('/api/info/user', data);
      console.log('user', res.data);
      dispatch({type: EDIT_PROFILE, payload: res.data});
      //RootNavigation.navigate('Profile');
    } catch (err) {
      console.log('This is error in action edit', err);
      dispatch({type: ERROR_EDIT, error: err});
    }
  };
};
