
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    switch (user.role) {
      case "STUDENT":
        navigate("/student-dashboard");
        break;

      case "TUTOR":
        navigate("/tutor-dashboard");
        break;

      case "WOMAN":
        navigate("/woman-dashboard");
        break;

      case "VOLUNTEER":
        navigate("/volunteer-dashboard");
        break;

      default:
        console.log("Unknown role:", user.role);
        navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Loading Dashboard...</h2>
    </div>
  );
}

export default Dashboard;

