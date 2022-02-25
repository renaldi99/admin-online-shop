import FIREBASE from "config/FIREBASE";
import swal from "sweetalert";
import { dispatchLoading, dispatchSuccess, dispatchError } from "../utils";

export const LOGIN_USER = "LOGIN_USER";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        // read data from realtime database
        FIREBASE.database()
          .ref("users/" + success.user.uid)
          .once("value")
          .then((resDB) => {
            if (resDB.val()) {
              if (resDB.val().status === "ADMIN") {
                // local storage version website
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(resDB.val())
                );
                dispatchSuccess(dispatch, LOGIN_USER, resDB.val());
              } else {
                dispatchError(dispatch, LOGIN_USER, "You are not an admin");
                swal("Error", "You are not an admin", "error");
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_USER, error);
            swal("Error", error, "error");
          });
      })
      .catch((error) => {
        var errorMessage = error.message;

        dispatchError(dispatch, LOGIN_USER, errorMessage);
        swal("Error", errorMessage, "error");
      });
  };
};

export const checkLogin = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CHECK_LOGIN);

    if (window.localStorage.getItem("user")) {
      const user = JSON.parse(window.localStorage.getItem("user"));

      FIREBASE.database()
        .ref("users/" + user.uid)
        .once("value")
        .then((response) => {
          if (response.val()) {
            if (response.val().status === "ADMIN") {
              dispatchSuccess(dispatch, CHECK_LOGIN, response.val());
            } else {
              dispatchError(dispatch, CHECK_LOGIN, "You are not an admin");
              history.push({ pathname: "/login" });
            }
          } else {
            dispatchError(dispatch, CHECK_LOGIN, "User not found");
            history.push({ pathname: "/login" });
          }
        })
        .catch((error) => {
          dispatchError(dispatch, CHECK_LOGIN, error);
          history.push({ pathname: "/login" });
        });
    } else {
      dispatchError(dispatch, CHECK_LOGIN, "You are not login");
      history.push({ pathname: "/login" });
    }
  };
};

export const logoutUser = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGOUT_USER);
    FIREBASE.auth()
      .signOut()
      .then((response) => {
        window.localStorage.removeItem("user");

        dispatchSuccess(dispatch, LOGOUT_USER, "Logout success");
        history.push({ pathname: "/login" });
        swal("Success", "Logout success", "success");
      })
      .catch((error) => {
        var errorMessage = error.message;

        dispatchError(dispatch, LOGOUT_USER, errorMessage);
        swal("Error", errorMessage, "error");
      });
  };
};
