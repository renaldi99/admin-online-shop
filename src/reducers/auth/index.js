import { LOGIN_USER, CHECK_LOGIN, LOGOUT_USER } from "../../actions/AuthAction";

const initialState = {
  loginUserLoading: false,
  loginUserResult: false,
  loginUserError: false,

  checkLoginLoading: false,
  checkLoginResult: false,
  checkLoginError: false,

  logoutUserLoading: false,
  logoutUserResult: false,
  logoutUserError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserLoading: action.payload.loading,
        loginUserResult: action.payload.data,
        loginUserError: action.payload.errorMessage,
      };
    case CHECK_LOGIN:
      return {
        ...state,
        checkLoginLoading: action.payload.loading,
        checkLoginResult: action.payload.data,
        checkLoginError: action.payload.errorMessage,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logoutUserLoading: action.payload.loading,
        logoutUserResult: action.payload.data,
        logoutUserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
