import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import {
  SELECT_DICTIONARY,
  SELECT_MODE,
  SELECT_MODE_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  START_LEARNING_FAIL,
  START_LEARNING,
  SELECT_LANGUAGE,
  CLOSE_ADDING_WORD,
} from "./types";

export const get_dictionaries = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/get_dictionaries`, config);

    if (res.data.error) {
      dispatch({ type: GET_DICTIONARIES_FAIL });
    } else {
      dispatch({ type: GET_DICTIONARIES, payload: res.data.dicts });
    }
  } catch (error) {
    dispatch({ type: GET_DICTIONARIES_FAIL });
  }
};

export const select_language = (language) => async (dispatch) => {
  dispatch({ type: SELECT_LANGUAGE, payload: language });
};

export const close_adding = () => async (dispatch) => {
  dispatch({ type: CLOSE_ADDING_WORD });
};

export const select_dictionary = (dictionary) => async (dispatch) => {
  dispatch({ type: SELECT_DICTIONARY, payload: dictionary });
};

export const start_learning = (mode, dict, lang) => async (dispatch) => {
  dispatch({ type: SELECT_MODE, payload: mode });
  dispatch({ type: START_LEARNING });

  // const config = {
  //   withCredentials: true,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "X-CSRFToken": Cookies.get("csrftoken"),
  //   },
  // };

  // const body = JSON.stringify({
  //   dict_name: dict,
  //   language: lang,
  //   mode: 1,
  // });

  // try {
  //   const res = await axios.post(`${baseURL}/initialize_session`, body, config);

  //   if (res.data.error) {
  //     dispatch({ type: START_LEARNING_FAIL });
  //     dispatch({ type: SELECT_MODE_FAIL, payload: mode });
  //   } else {
  //     dispatch({ type: SELECT_MODE, payload: mode });
  //     dispatch({ type: START_LEARNING, payload: res.data });
  //   }
  // } catch (error) {
  //   dispatch({ type: START_LEARNING_FAIL });
  //   dispatch({ type: SELECT_MODE_FAIL, payload: mode });
  // }
};
