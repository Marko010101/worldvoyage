import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Button from "../components/Button.jsx";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, error, resetError } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) return navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  useEffect(() => {
    return () => {
      if (error) {
        resetError();
      }
    };
  }, [error, resetError]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
