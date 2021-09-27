import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: "false",
  login: (token) => {},
  logout: () => {},
});

//named export
export const AuthContextProvider = (props) => {
  // Ppreserving the token on refresh
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
