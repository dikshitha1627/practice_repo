
import { useEffect, useState } from "react";
import api from "../api/api";

function TutorDashboard() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorData();
  }, []);

  const fetchTutorData = async () => {
    try {
      // Get logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        console.log("No logged-in user found");
        return;
      }

      const tutorId = user.id;

      console.log("Logged-in tutor ID:", tutorId);

      // Get students assigned to this tutor
      const studentsResponse = await api.get(
        `/api/tutor/students/${tutorId}`
      );

      setStudents(studentsResponse.data);

      // Get classes of this tutor
      const classesResponse = await api.get(
        `/api/classes/tutor/${tutorId}`
      );

      setClasses(classesResponse.data);
    } catch (error) {
      console.error("Error fetching tutor data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>👩‍🏫 Tutor Dashboard</h1>

      <p>Manage your students and upcoming classes.</p>

      {/* Tutor Information */}
      <div style={styles.section}>
        <h2>👤 Tutor Information</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Logged in as:{" "}
            <strong>
              {JSON.parse(localStorage.getItem("user"))?.username}
            </strong>
          </p>
        )}
      </div>

      {/* Students */}
      <div style={styles.section}>
        <h2>👨‍🎓 My Students</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length > 0 ? (
          students.map((student) => (
            <div key={student._id} style={styles.studentCard}>
              <strong>{student.username}</strong>

              <p>Role: {student.role}</p>
            </div>
          ))
        ) : (
          <p>No students assigned.</p>
        )}
      </div>

      {/* Classes */}
      <div style={styles.section}>
        <h2>📅 My Classes</h2>

        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length > 0 ? (
          classes.map((classItem) => (
            <div key={classItem._id} style={styles.classCard}>
              <h3>📚 {classItem.subject}</h3>

              <p>
                🕐 Time: {classItem.time}
              </p>

              <p>
                📅 Date:{" "}
                {new Date(classItem.date).toLocaleDateString()}
              </p>

              <p>
                👨‍🎓 Students:{" "}
                {classItem.students?.length || 0}
              </p>
            </div>
          ))
        ) : (
          <p>No upcoming classes.</p>
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

  studentCard: {
    background: "#f8f9fc",
    padding: "15px",
    marginTop: "12px",
    borderRadius: "10px",
  },

  classCard: {
    background: "#f8f9fc",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
  },
};

export default TutorDashboard;

