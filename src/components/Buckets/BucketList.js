import ListItem from "./ListItem";
import classes from "./BucketList.module.css";

const BucketList = (props) => {
  const buckets = props.items;

  return (
    <ul className={classes.bucketsList}>
      {buckets.map((bucket) => {
        return (
          <ListItem
            key={bucket._id}
            title={bucket.title}
            info={bucket.description}
          />
        );
      })}
    </ul>
  );
};

export default BucketList;
