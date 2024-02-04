import {LOGIN, SIGNUP,  SEARCHEMAIL} from '../Types';

const initilaState = {
  email: null,
};

const AuthReducer = (state = initilaState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state
  }
};

export default AuthReducer;
