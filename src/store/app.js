import React, { useReducer, createContext } from "react";
const CryptoJS = require("crypto-js");

export const AppContext = createContext();

const initialState = {
  loading: false,
  error: null,
  step: 1,
  formData: {
  },
  covid19Modal: false,
  activeQuestion: {}
};

if (localStorage.getItem('formData')) {
  var bytes = CryptoJS.AES.decrypt(localStorage.getItem('formData'), 'secretKey');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log('decryptedData: ', decryptedData);
  
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        step: action.step,
      };
    case "SET_FORM_DATA":
      // updateSession(action.formData);
      return {
        ...state,
        formData: { ...state.formData, ...action.formData },
      };
    case "GET_SESSION":
      return {
        ...state,
        formData: { ...state.formData, ...action.formData },
      };
    case "START":
      return {
        loading: true,
      };
    case "COMPLETE":
      return {
        loading: false,
      };
    case "SET_COVID19_MODAL": {
      return {
        ...state,
        covid19Modal: action.covid19Modal
      }
    }
    case "SET_ACTIVE_Q": {
      return {
        ...state,
        activeQuestion: action.activeQuestion
      }
    }

    default:
      throw new Error();
  }
};

export const AppContextProvider = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
