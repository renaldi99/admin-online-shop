import {
  GET_LIST_PRODUCT,
  UPLOAD_PRODUCT,
  ADD_PRODUCT,
  GET_DETAIL_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../../actions/ProductAction";

const initialState = {
  getListProductLoading: false,
  getListProductResult: false,
  getListProductError: false,

  uploadProductLoading: false,
  uploadProductResult: false,
  uploadProductError: false,

  addProductLoading: false,
  addProductResult: false,
  addProductError: false,

  getDetailProductLoading: false,
  getDetailProductResult: false,
  getDetailProductError: false,

  updateProductLoading: false,
  updateProductResult: false,
  updateProductError: false,

  deleteProductLoading: false,
  deleteProductResult: false,
  deleteProductError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PRODUCT:
      return {
        ...state,
        getListProductLoading: action.payload.loading,
        getListProductResult: action.payload.data,
        getListProductError: action.payload.errorMessage,
      };
    case UPLOAD_PRODUCT:
      return {
        ...state,
        uploadProductLoading: action.payload.loading,
        uploadProductResult: action.payload.data,
        uploadProductError: action.payload.errorMessage,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addProductLoading: action.payload.loading,
        addProductResult: action.payload.data,
        addProductError: action.payload.errorMessage,
      };
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        getDetailProductLoading: action.payload.loading,
        getDetailProductResult: action.payload.data,
        getDetailProductError: action.payload.errorMessage,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProductLoading: action.payload.loading,
        updateProductResult: action.payload.data,
        updateProductError: action.payload.errorMessage,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProductLoading: action.payload.loading,
        deleteProductResult: action.payload.data,
        deleteProductError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
