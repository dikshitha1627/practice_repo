
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      const requestData = {
        username,
        password,
        role,
      };

      console.log("SENDING TO BACKEND:", requestData);

      const response = await api.post(
        "/api/auth/register",
        requestData
      );

      console.log("Register response:", response.data);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE DATA:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Columbus Family</h1>

      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <br />

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label>
          <br />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Select Role</label>
          <br />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">
              -- Select Role --
            </option>

            <option value="STUDENT">
              Student
            </option>

            <option value="WOMAN">
              Woman
            </option>

            <option value="TUTOR">
              Tutor
            </option>

            <option value="VOLUNTEER">
              Volunteer
            </option>
          </select>
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <button onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
}

export default Register;

