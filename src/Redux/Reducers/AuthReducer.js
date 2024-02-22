import { LOGIN, SIGNUP, SEARCHEMAIL, CREDITS } from '../Types';

const initilaState = {
  user: null,
};

const AuthReducer = (state = initilaState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case CREDITS:
      return {
        ...state,
        user: { ...state.user, balance: action.payload },
      };
    default:
      return state
  }
};

export default AuthReducer;
