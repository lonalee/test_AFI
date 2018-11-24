import { SUBMIT_NEWUSER } from "../Actions/types";

const initialState = {
  user: []
};

export default function contactInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_NEWUSER:
      console.log(state);
      return { user: [...state.user, action.payload] };

    default:
      return state;
  }
}
