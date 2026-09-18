
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import WomanDashboard from "./pages/WomanDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Main Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Role Dashboards */}

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/tutor-dashboard"
          element={<TutorDashboard />}
        />

        <Route
          path="/woman-dashboard"
          element={<WomanDashboard />}
        />

        <Route
          path="/volunteer-dashboard"
          element={<VolunteerDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
