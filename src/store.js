import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Fixed typo (closing quote missing)
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userregisterReducer,
  userUpdateReducer,
} from "./components/reducers/userReducer";
import {
  noteCreateReducer,
  noteListReducer,
  noteUpdateReducer,
  noteDeleteReducer,
} from "./components/reducers/noteReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userregisterReducer,
  userUpdate: userUpdateReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
  updateNote: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
