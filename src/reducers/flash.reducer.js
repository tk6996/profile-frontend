import { ERROR, SUCCESS, DISABLE } from "../actions/flash.action";

const initialState = {
  type: "None",
  message: "",
  duration: 0,
  visible: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR:
      return { ...state, ...payload, type: ERROR, visible: true };
    case SUCCESS:
      return { ...state, ...payload, type: SUCCESS, visible: true };
    case DISABLE:
      return { ...state, visible: false };
    default:
      return state;
  }
};
