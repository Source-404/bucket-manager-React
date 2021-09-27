import { useState, useContext } from "react";

import BucketList from "./BucketList";
import AuthContext from "../../store/auth-context";
import classes from "./Buckets.module.css";

const Buckets = (props) => {
  const [buckets, setBuckets] = useState([]);
  const authCtx = useContext(AuthContext);

  const getBuckets = async () => {
    try {
      const response = await fetch(`/buckets`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setBuckets(data);
    } catch (e) {
      console.log("something went wrong");
    }
  };
  // const buckets = [
  //   {
  //     id: 1,
  //     name: "Name",
  //     info: "info about the bucket",
  //   },
  //   {
  //     id: 2,
  //     name: "Bucket2",
  //     info: "info about bucket two",
  //   },
  // ];

  return (
    <div className={classes.container}>
      <div className={classes.action}>
        <button type="button" onClick={getBuckets}>
          Refresh!
        </button>
      </div>
      <BucketList items={buckets} />
    </div>
  );
};

export default Buckets;
