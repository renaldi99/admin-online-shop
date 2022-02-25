import { GET_LIST_ORDER, UPDATE_ORDER } from "../../actions/OrderAction";

const initialState = {
  getListOrderLoading: false,
  getListOrderResult: false,
  getListOrderError: false,

  updateStatusOrderLoading: false,
  updateStatusOrderResult: false,
  updateStatusOrderError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ORDER:
      return {
        ...state,
        getListOrderLoading: action.payload.loading,
        getListOrderResult: action.payload.data,
        getListOrderError: action.payload.errorMessage,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        updateStatusOrderLoading: action.payload.loading,
        updateStatusOrderResult: action.payload.data,
        updateStatusOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
