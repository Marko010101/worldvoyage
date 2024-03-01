import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthContext.jsx";

function User() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }
  const fakeAvatar = "https://i.pravatar.cc/100";

  // From the email, convert to the part before '@', and if there is any number at the end of it, deleting it.
  function handleUsernameConvert(email) {
    const parts = email.split("@");
    let username = parts[0];

    if (username.includes(".")) {
      username = username.replace(/\./g, " ");
    }

    username = username.replace(/\d+$/, "");

    return username;
  }

  return (
    <div className={styles.user}>
      {user && (
        <>
          <img src={fakeAvatar} alt={user.name} />
          <span>Welcome, {handleUsernameConvert(user.email)}</span>
          <button onClick={handleClick}>Logout</button>
        </>
      )}
    </div>
  );
}

export default User;
