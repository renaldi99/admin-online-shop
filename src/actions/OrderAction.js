import FIREBASE from "config/FIREBASE";
import { dispatchLoading, dispatchSuccess, dispatchError } from "../utils";

export const GET_LIST_ORDER = "GET_LIST_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";

// target list history firebase
export const getListOrder = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_ORDER);

    FIREBASE.database()
      .ref("histories")
      .once("value", (querySnapshot) => {
        //result
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_ORDER, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_ORDER, error);
        alert(error);
      });
  };
};

export const updateOrder = (order_id, transaction_status) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_ORDER);

    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "SUCCESS"
        : transaction_status;

    FIREBASE.database()
      .ref("histories")
      .child(order_id)
      .update({
        status: status,
      })
      .then((response) => {
        dispatchSuccess(dispatch, UPDATE_ORDER, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_ORDER, error);
        alert(error);
      });
  };
};
