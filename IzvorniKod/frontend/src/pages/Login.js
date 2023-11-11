import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <RightPartScreen />
    </div>
  );
}

function RightPartScreen() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const dataSource = {
      mail: mail,
      password: password,
    };
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSource),
    };
    const response = fetch("http://localhost:8000", requestOption);
    if (response.ok) {
      navigate("mainScreen");
    } else {
      setError(true);
    }
  }

  return (
    <form className={styles.rightPartScreen} onSubmit={handleSubmit}>
      <div className={styles.buttons}>
        <button className={styles.button1}>Log in</button>
        <Link to="/signup">
          <button className={styles.button2}>Sign up</button>
        </Link>
      </div>
      <div className={styles.emailInputDiv}>
        <input
          className={styles.emailInput}
          type="text"
          placeholder="Email..."
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div>
        <div className={styles.passwordInputDiv}>
          <input
            className={styles.passwordInput}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
        </div>
        <div className={styles.showPasswordButton}>
          {error ? (
            <p className={styles.wrongDataError}>*Wrong email or password* </p>
          ) : (
            ""
          )}
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className={styles.comingSoonDiv}>
        <div className={styles.comingSoonDivIteration}>
          <div className={styles.comingSoonText}>Coming soon!</div>
          <div className={styles.comingSoonLogInGoogleAppleDiv}>
            <button className={styles.comingSoon} disabled>
              Log in with Google
            </button>
          </div>
          <div className={styles.comingSoonLogInGoogleAppleDiv}>
            <button className={styles.comingSoon} disabled>
              Log in with Apple
            </button>
          </div>
        </div>
      </div>
      <div className={styles.buttonOkDiv}>
        <button className={styles.buttonOk}>OK</button>
      </div>
    </form>
  );
}

export default Login;
