import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DISABLE } from "../actions/flash.action";

export default function Flash() {
  const flash = useSelector(({ FlashReducer }) => FlashReducer);
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch({ type: DISABLE });
    }, flash.duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [flash, dispatch]);

  return (
    ready &&
    flash.visible && <p style={styleSheet[flash.type]}>{flash.message}</p>
  );
}

export const activeFlash = (dispatch, type, message, duration = 5000) => {
  dispatch({
    type: type,
    payload: { type: type, message: message, duration: duration },
  });
};

export const clearFlash = (dispatch) => {
  dispatch({ type: DISABLE });
};

const styleSheet = {
  ERROR: {
    color: "red",
    backgroundColor: "#f7c3c3",
    padding: "20px",
    borderRadius: "5px",
  },
  SUCCESS: {
    color: "green",
    backgroundColor: "#c3f7c3",
    padding: "20px",
    borderRadius: "5px",
  },
};
