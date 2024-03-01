import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Button from "../components/Button.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isAuthenticated, error, resetError } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) return navigate("/login", { replace: true });
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
      <form className={styles.form} onSubmit={handleSubmit}>
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
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Register</Button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
