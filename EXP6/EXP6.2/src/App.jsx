import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Strict Email Pattern (No dot before @)
  const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  // Password Rules
  const rules = {
    capital: /^[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    length: password.length >= 5,
  };

  const isPasswordValid =
    rules.capital && rules.number && rules.special && rules.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // Email Validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email =
        "Email must not contain dot before @ (Example: s@gmail.com)";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordValid) {
      newErrors.password = "Password does not meet all required conditions";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Login Successful!");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit} className="form">
        {/* Email */}
        <label>Email ID:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Password */}
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        {/* Password Rules Live Display */}
        <ul className="rules">
          <li className={rules.capital ? "valid" : "invalid"}>
            Starts with capital letter
          </li>
          <li className={rules.number ? "valid" : "invalid"}>
            Contains at least one number
          </li>
          <li className={rules.special ? "valid" : "invalid"}>
            Contains at least one special character
          </li>
          <li className={rules.length ? "valid" : "invalid"}>
            Minimum 5 characters
          </li>
        </ul>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default App;
