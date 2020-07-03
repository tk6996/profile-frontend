import { LOGIN, LOGOUT } from "../actions/user.action";

const initialState = {
  user_id: -1,
  name: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, ...payload };
    case LOGOUT:
      return { ...state, user_id: -1, name: "" };
    default:
      return state;
  }
};
