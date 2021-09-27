import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const createUserRequest = async (
    enteredName,
    enteredEmail,
    enteredPassword
  ) => {
    try {
      const response = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log(data);
      authCtx.login(data.token);
      history.replace("/");
    } catch (e) {
      console.log("something went wrong");
    }
  };

  const loginUserRequest = async (enteredEmail, enteredPassword) => {
    try {
      const response = await fetch(`/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      console.log(data);

      authCtx.login(data.token);
      history.replace("/");
    } catch (e) {
      console.log("something went wrong");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredname = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add Validation

    if (isLogin) {
      loginUserRequest(enteredEmail, enteredPassword);
    } else {
      createUserRequest(enteredname, enteredEmail, enteredPassword);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="name" id="name" required ref={nameInputRef} />

          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

// "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
//           "Access-Control-Allow-Headers":
//             "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
