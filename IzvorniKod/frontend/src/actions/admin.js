import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import {
  ADD_ADMIN_FAILURE,
  ADD_ADMIN_SUCCESS,
  GET_ADMIN_DATA_FAILURE,
  GET_ADMIN_DATA_SUCCESS,
  DELETE_USER_ADMIN_FAIL,
  DELETE_USER_ADMIN_SUCCESS,
  GET_STUDENT_DATA_FAILURE,
  GET_STUDENT_DATA_SUCCESS,
  REMOVE_ADMIN_SUCCESS,
  REMOVE_ADMIN_FAILURE,
  ADD_DICTIONARY_SUCCESS,
  ADD_DICTIONARY_FAILURE,
  ADD_WORD_FAILURE,
  ADD_WORD_SUCCESS,
  REMOVE_WORD_SUCCESS,
  REMOVE_WORD_FAILURE,
  GET_DICTIONARY_WORDS_SUCCESS,
  GET_DICTIONARY_WORDS_FAIL,
  EDIT_WORD_SUCCESS,
  EDIT_WORD_FAIL,
  REMOVE_WORD_FROM_REDUCER_STATE,
  UPDATE_WORD_IN_REDUCER_STATE
} from "./types";

export const delete_account = (email) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    email,
  });

  try {
    const res = await axios.post(`${baseURL}/delete_user_admin`, body, config);

    if (res.data.success) {
      dispatch({
        type: DELETE_USER_ADMIN_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: DELETE_USER_ADMIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_USER_ADMIN_FAIL,
    });
  }
};

export const get_students = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/get_students`, config);

    if (res.data.error) {
      dispatch({
        type: GET_STUDENT_DATA_FAILURE,
      });
    } else {
      dispatch({
        type: GET_STUDENT_DATA_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_STUDENT_DATA_FAILURE,
    });
  }
};

export const get_admins = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/get_admins`, config);

    if (res.data.error) {
      dispatch({
        type: GET_ADMIN_DATA_FAILURE,
      });
    } else {
      dispatch({
        type: GET_ADMIN_DATA_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ADMIN_DATA_FAILURE,
    });
  }
};

export const remove_admin = (email) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    email,
  });

  try {
    const res = await axios.put(`${baseURL}/remove_admin`, body, config);

    if (res.data.success) {
      dispatch({
        type: REMOVE_ADMIN_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: REMOVE_ADMIN_FAILURE,
      });
    }
  } catch (err) {
    dispatch({
      type: REMOVE_ADMIN_FAILURE,
    });
  }
};

export const add_admin = (email) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    email,
  });

  try {
    const res = await axios.post(`${baseURL}/add_admin`, body, config);

    if (res.data.success) {
      dispatch({
        type: ADD_ADMIN_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: ADD_ADMIN_FAILURE,
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_ADMIN_FAILURE,
    });
  }
};

export const create_dictionary =
  (dictionaryName, language) => async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      dict_name: dictionaryName,
      language: language,
      word_list: [],
    });
    try {
      const res = await axios.post(
        `${baseURL}/create_dictionary`,
        body,
        config
      );
      if (res.data.success) {
        dispatch({
          type: ADD_DICTIONARY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_DICTIONARY_FAILURE,
        });
      }
    } catch (err) {
      dispatch({
        type: ADD_DICTIONARY_FAILURE,
      });
    }
  };

export const add_word_to_dictionary =
  (dictionaryName, word, language, translation, wordType, definition) =>
  async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      dict_name: dictionaryName,
      language: language,
      cro_translation: translation,
      definition: definition,
      word_type: wordType,
      word_str: word,
    });
    try {
      const res = await axios.post(`${baseURL}/add_word`, body, config);
      if (res.data.success) {
        dispatch({
          type: ADD_WORD_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_WORD_FAILURE,
        });
      }
    } catch (err) {
      dispatch({
        type: ADD_WORD_FAILURE,
      });
    }
  };

export const remove_word_from_dictionary =
  (dictionaryName, word, language) => async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      dict_name: dictionaryName,
      language: language,
      word_str: word,
    });
    try {
      const res = await axios.put(`${baseURL}/remove_word`, body, config);
      if (res.data.success) {
        dispatch({
          type: REMOVE_WORD_SUCCESS,
        });
      } else {
        dispatch({
          type: REMOVE_WORD_FAILURE,
        });
      }
    } catch (err) {
      dispatch({
        type: REMOVE_WORD_FAILURE,
      });
    }
  };

export const get_dictionary_words =
  (language, dictionaryName) => async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      language: language,
      dict_name: dictionaryName,
    });
    try {
      const res = await axios.put(
        `${baseURL}/get_words_from_dict`,
        body,
        config
      );
      dispatch({ type: GET_DICTIONARY_WORDS_SUCCESS, payload: res.data.words });
    } catch (err) {
      dispatch({ type: GET_DICTIONARY_WORDS_FAIL });
    }
  };

export const edit_word =
  (word, newWord, language, newTranslation, newDefinition, newType) =>
  async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      language: language,
      new_cro_translation: newTranslation,
      new_definition: newDefinition,
      new_word_type: newType,
      word_str: word,
      new_word_str: newWord,
    });
    try {
      const res = await axios.put(`${baseURL}/edit_word`, body, config);
      if (res.data.success) {
        dispatch({ type: EDIT_WORD_SUCCESS });
      }
    } catch (err) {
      dispatch({ type: EDIT_WORD_FAIL });
    }
  };

export const remove_word_from_reducer_state = (word_str) => async (dispatch) => {
    dispatch({type : REMOVE_WORD_FROM_REDUCER_STATE, payload: word_str})
};

export const update_word_in_reducer_state = 
(word, newWord, newTranslation, newDefinition, newWordType) => async (dispatch) => {
  dispatch({type : UPDATE_WORD_IN_REDUCER_STATE, payload : {
    word: word,
    newWord: newWord,
    newTranslation: newTranslation,
    newDefinition: newDefinition,
    newWordType: newWordType
  }})
}
  