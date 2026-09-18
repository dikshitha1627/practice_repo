
import { useEffect, useState } from "react";
import api from "../api/api";

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      // Get logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        console.log("No logged-in user found");
        return;
      }

      const studentId = user.id;

      console.log("Logged-in student ID:", studentId);

      // Get all students
      const profileResponse = await api.get("/api/auth/profile");
setStudents([profileResponse.data]);

      // Get attendance of logged-in student
      const attendanceResponse = await api.get(
        `/api/attendance/student/${studentId}`
      );
      setAttendance(attendanceResponse.data);

      // Get classes of logged-in student
      const classesResponse = await api.get(
        `/api/classes/student/${studentId}`
      );
      setClasses(classesResponse.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🎓 Student Dashboard</h1>

      <p>Welcome back! Continue your learning journey.</p>

      {/* Student Information */}
      <div style={styles.section}>
        <h2>👨‍🎓 Student Information</h2>

        {loading ? (
          <p>Loading...</p>
        ) : students.length > 0 ? (
          students.map((student) => (
            <p key={student._id}>
              <strong>{student.username}</strong> — {student.role}
            </p>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>

      {/* Subjects */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>📐 Mathematics</h2>

          <p>
            Improve your mathematical skills through guided learning sessions.
          </p>

          <button>View Classes</button>
        </div>

        <div style={styles.card}>
          <h2>📚 English</h2>

          <p>
            Build your English communication, reading and writing skills.
          </p>

          <button>View Classes</button>
        </div>
      </div>

      {/* Attendance */}
      <div style={styles.section}>
        <h2>📊 Attendance</h2>

        {loading ? (
          <p>Loading attendance...</p>
        ) : attendance.length > 0 ? (
          attendance.map((record) => (
            <p key={record._id}>
              {record.subject}: <strong>{record.status}</strong>
            </p>
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      {/* Upcoming Classes */}
      <div style={styles.section}>
        <h2>📅 Upcoming Classes</h2>

        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length > 0 ? (
          classes.map((classItem) => (
            <p key={classItem._id}>
              📚 {classItem.subject} — {classItem.time}
            </p>
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

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px",
    maxWidth: "900px",
    marginTop: "30px",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  section: {
    background: "white",
    padding: "25px",
    marginTop: "25px",
    borderRadius: "16px",
    maxWidth: "850px",
  },
};

export default StudentDashboard;

