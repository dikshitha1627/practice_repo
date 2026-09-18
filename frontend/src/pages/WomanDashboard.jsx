
import { useEffect, useState } from "react";
import api from "../api/api";

function WomanDashboard() {
  const [programs, setPrograms] = useState([]);
  const [myPrograms, setMyPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        console.log("No logged-in user found");
        return;
      }

      const userId = user.id;

      console.log("Logged-in woman ID:", userId);

      // Get all programs
      const programsResponse = await api.get("/api/programs");
      setPrograms(programsResponse.data);

      // Get programs joined by this user
      const myProgramsResponse = await api.get(
        `/api/programs/my-programs/${userId}`
      );

      setMyPrograms(myProgramsResponse.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinProgram = async (programId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const userId = user.id;

      await api.post("/api/programs/join", {
        programId,
        userId,
      });

      alert("Program joined successfully!");

      // Refresh programs after joining
      fetchPrograms();
    } catch (error) {
      console.error("Error joining program:", error);

      alert(
        error.response?.data?.message ||
          "Failed to join program."
      );
    }
  };

  const isJoined = (programId) => {
    return myPrograms.some(
      (program) => program._id === programId
    );
  };

  return (
    <div style={styles.container}>
      <h1>👩 Woman Dashboard</h1>

      <p>
        Explore programs and develop new skills.
      </p>

      {/* User Information */}
      <div style={styles.section}>
        <h2>👤 My Information</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Welcome,{" "}
            <strong>
              {JSON.parse(localStorage.getItem("user"))?.username}
            </strong>
          </p>
        )}
      </div>

      {/* Available Programs */}
      <div style={styles.section}>
        <h2>📚 Available Programs</h2>

        {loading ? (
          <p>Loading programs...</p>
        ) : programs.length > 0 ? (
          programs.map((program) => (
            <div key={program._id} style={styles.programCard}>
              <h3>{program.name}</h3>

              <p>{program.description}</p>

              {isJoined(program._id) ? (
                <button disabled>
                  ✓ Joined
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleJoinProgram(program._id)
                  }
                >
                  Join Program
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No programs available.</p>
        )}
      </div>

      {/* My Programs */}
      <div style={styles.section}>
        <h2>⭐ My Programs</h2>

        {loading ? (
          <p>Loading...</p>
        ) : myPrograms.length > 0 ? (
          myPrograms.map((program) => (
            <div key={program._id} style={styles.myProgramCard}>
              <h3>{program.name}</h3>

              <p>{program.description}</p>

              <strong>✓ Joined</strong>
            </div>
          ))
        ) : (
          <p>You haven't joined any programs yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "#f5f7fb",
    fontFamily: "Arial",
  },

  section: {
    background: "white",
    padding: "25px",
    marginTop: "25px",
    borderRadius: "16px",
    maxWidth: "850px",
  },

  programCard: {
    background: "#f8f9fc",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
  },

  myProgramCard: {
    background: "#f8f9fc",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
  },
};

export default WomanDashboard;

