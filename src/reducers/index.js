import { combineReducers } from "redux";
import UserReducer from "./user.reducer";
import FlashReducer from "./flash.reducer";

export default combineReducers({ UserReducer, FlashReducer });
