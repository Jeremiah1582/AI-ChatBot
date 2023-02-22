import React, { useState, createContext } from "react";
import axios from "axios";
export const MyContext = createContext();

function MyProvider({ children }) {
  const hostLink = `http://localhost:3001/`;
  const backendHostLink = "http://127.0.0.1:5000";

  //HEADERS
  const myHeader = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("currentToken"),
    },
  };


  return (
    <MyContext.Provider
      value={{
        hostLink,
        backendHostLink,
        myHeader
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
export default MyProvider;
