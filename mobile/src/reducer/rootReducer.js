import {combineReducers} from 'redux';
import {locationReducer} from '../screens/Location/reducer';
import {themeReducer} from '../appTheme/themeReducer';
import {orderReducer} from '../screens/Order/reducer';
import {signUpReducer} from '../screens/SignUp/reducer';
import {signInReducer} from '../screens/SignIn/reducer';
import {cartReducer} from '../screens/Cart/reducer';

// const rootReducer = (state, action) => {
//     // when a logout action is dispatched it will reset redux state
//     switch (action.type) {
//         case 'RESET_ALL':
//             state = undefined;
//             break;
//         case 'CLEAR_STATE':
//             state.loginReducer = undefined;
//             break;
//         default:
//             break;
//     }

//     return appReducer(state, action);
// };
const rootReducer = combineReducers({
  themeReducer,
  locationReducer,
  orderReducer,
  signUpReducer,
  signInReducer,
  cartReducer,
});

export {rootReducer};
