import axios from "axios";

const apiCall = ({
  url,
  method,
  data,
  onStart,
  onSuccess,
  onError,
  onEnd,
}) => async (dispatch) => {
  if (onStart) {
    if (typeof onStart === "string") {
      dispatch({ type: onStart });
    } else onStart();
  }

  try {
    const { data: resData } = await axios.request({
      baseURL: "/api",
      url,
      method,
      data,
    });

    // Dispatch any actions or call functions
    onSuccess.forEach((listener) => {
      if (listener) {
        if (typeof listener === "string")
          dispatch({ type: listener, payload: resData });
        else listener(resData);
      }
    });
  } catch ({ message }) {
    // Dispatch any actions or call functions
    onError.forEach((listener) => {
      if (listener) {
        if (typeof listener === "string")
          dispatch({ type: listener, payload: message });
        else listener(message);
      }
    });
  } finally {
    if (onEnd) {
      if (typeof onEnd === "string") {
        dispatch({ type: onEnd });
      } else onEnd();
    }
  }
};

export default apiCall;
