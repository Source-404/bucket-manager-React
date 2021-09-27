import { useRef, useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const inputName = useRef();
  const inputInfo = useRef();

  const uploadBucket = async (e) => {
    e.preventDefault();

    const enteredNmae = inputName.current.value;
    const enteredInfo = inputInfo.current.value;
    // add to database

    try {
      const response = await fetch(`/buckets`, {
        method: "POST",
        body: JSON.stringify({
          title: enteredNmae,
          description: enteredInfo,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      inputName.current.value = "";
      inputInfo.current.value = "";
    } catch (e) {
      console.log("something went wrong");
    }
  };
  return (
    <form className={classes.form} onSubmit={uploadBucket}>
      <div className={classes.control}>
        <label htmlFor="bucket-name">Bucket Name</label>
        <input type="text" id="bucket-name" ref={inputName} />

        <label htmlFor="bucket-text">Bucket Text</label>
        <textarea id="bucket-text" cols="50" rows="5" ref={inputInfo} />
      </div>
      <div className={classes.action}>
        <button>Add Bucket</button>
      </div>
    </form>
  );
};

export default ProfileForm;
