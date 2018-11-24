import { combineReducers } from "redux";

import contactInfoReducer from "./contactInfoReducer";

export default combineReducers({
  contactInfo: contactInfoReducer
});
