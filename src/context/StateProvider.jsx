import React, { createContext, useContext, useReducer, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const getInitialState = () => {
    try {
      const savedState = localStorage.getItem("term");

      return savedState ? JSON.parse(savedState) : initialState;
    } catch {
      return initialState;
    }
  };

  const [term, dispatch] = useReducer(reducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem("term", JSON.stringify(term));
  }, [term]);

  return (
    <StateContext.Provider value={{ term, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
