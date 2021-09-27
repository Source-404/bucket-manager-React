import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";
import Buckets from "../Buckets/Buckets";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
      <Buckets />
    </section>
  );
};

export default UserProfile;
