
import { useEffect, useState } from "react";
import api from "../api/api";

function VolunteerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/api/events");

      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      // Get logged-in user
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const userId = user.id;

      console.log("Logged-in volunteer ID:", userId);

      // Create event
      await api.post("/api/events", {
        title,
        description,
        date,
        createdBy: userId,
      });

      alert("Event created successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setDate("");

      // Refresh events
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create event."
      );
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);

      alert("Event deleted successfully!");

      // Refresh events
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete event."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1>🙋 Volunteer Dashboard</h1>

      <p>
        Manage community events and activities.
      </p>

      {/* Volunteer Information */}
      <div style={styles.section}>
        <h2>👤 Volunteer Information</h2>

        <p>
          Logged in as:{" "}
          <strong>
            {JSON.parse(localStorage.getItem("user"))?.username}
          </strong>
        </p>
      </div>

      {/* Create Event */}
      <div style={styles.section}>
        <h2>➕ Create Event</h2>

        <form onSubmit={handleCreateEvent}>
          <div>
            <label>Event Title</label>

            <br />

            <input
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label>Description</label>

            <br />

            <textarea
              placeholder="Enter event description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>

          <br />

          <div>
            <label>Date</label>

            <br />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <br />

          <button type="submit">
            Create Event
          </button>
        </form>
      </div>

      {/* Events */}
      <div style={styles.section}>
        <h2>📅 Community Events</h2>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} style={styles.eventCard}>
              <h3>{event.title}</h3>

              <p>{event.description}</p>

              <p>
                📅 Date:{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              {event.createdBy && (
                <p>
                  👤 Created by:{" "}
                  <strong>
                    {event.createdBy.username}
                  </strong>
                </p>
              )}

              <button
                onClick={() =>
                  handleDeleteEvent(event._id)
                }
              >
                Delete Event
              </button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
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

  eventCard: {
    background: "#f8f9fc",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
  },
};

export default VolunteerDashboard;

