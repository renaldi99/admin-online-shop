import { combineReducers } from "redux";
import CatalogReducer from "./catalog";
import ProductReducer from "./product";
import AuthReducer from "./auth";

export default combineReducers({
  CatalogReducer,
  ProductReducer,
  AuthReducer,
});
