import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import TicketBoard from "./components/TicketBoard";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    }
    fetchData();
  }, []);

  return (
    <div className="app-container">
      {/* Top White Bar */}
      <div className="top-bar">
        <div className="dropdown">
          <button className="dropdown-button">
            <span>Display</span> {/* Placeholder for the Display icon */}
            <span className="down-arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <div className="submenu">
              Grouping
              <div className="submenu-content">
                <button onClick={() => setGrouping("status")}>Status</button>
                <button onClick={() => setGrouping("user")}>User</button>
                <button onClick={() => setGrouping("priority")}>
                  Priority
                </button>
              </div>
            </div>
            <div className="submenu">
              Ordering
              <div className="submenu-content">
                <button onClick={() => setOrdering("priority")}>
                  Priority
                </button>
                <button onClick={() => setOrdering("title")}>Title</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="kanban-board">
        <TicketBoard
          tickets={tickets}
          users={users}
          grouping={grouping}
          ordering={ordering}
        />
      </div>
    </div>
  );
}

export default App;
