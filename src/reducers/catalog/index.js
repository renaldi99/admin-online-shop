import {
  GET_LIST_CATALOG,
  ADD_CATALOG,
  GET_DETAIL_CATALOG,
  UPDATE_CATALOG,
  DELETE_CATALOG,
} from "../../actions/CatalogAction";

const initialState = {
  getListCatalogLoading: false,
  getListCatalogResult: false,
  getListCatalogError: false,

  addCatalogLoading: false,
  addCatalogResult: false,
  addCatalogError: false,

  getDetailCatalogLoading: false,
  getDetailCatalogResult: false,
  getDetailCatalogError: false,

  updateCatalogLoading: false,
  updateCatalogResult: false,
  updateCatalogError: false,

  deleteCatalogLoading: false,
  deleteCatalogResult: false,
  deleteCatalogError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CATALOG:
      return {
        ...state,
        getListCatalogLoading: action.payload.loading,
        getListCatalogResult: action.payload.data,
        getListCatalogError: action.payload.errorMessage,
      };
    case ADD_CATALOG:
      return {
        ...state,
        addCatalogLoading: action.payload.loading,
        addCatalogResult: action.payload.data,
        addCatalogError: action.payload.errorMessage,
      };
    case GET_DETAIL_CATALOG:
      return {
        ...state,
        getDetailCatalogLoading: action.payload.loading,
        getDetailCatalogResult: action.payload.data,
        getDetailCatalogError: action.payload.errorMessage,
      };
    case UPDATE_CATALOG:
      return {
        ...state,
        updateCatalogLoading: action.payload.loading,
        updateCatalogResult: action.payload.data,
        updateCatalogError: action.payload.errorMessage,
      };
    case DELETE_CATALOG:
      return {
        ...state,
        deleteCatalogLoading: action.payload.loading,
        deleteCatalogResult: action.payload.data,
        deleteCatalogError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
