import { combineReducers } from "redux";

import bookmarkReducer from "./reducers/bookmarkSlice";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  bookmark: bookmarkReducer
});

export default rootReducer;
