import { SUBMIT_NEWUSER } from "./types";

export const submitUser = user => dispatch => {
  console.log(user);
  dispatch({
    type: SUBMIT_NEWUSER,
    payload: user
  });
};
