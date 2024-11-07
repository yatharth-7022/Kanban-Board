import React from "react";
import "../styles/TicketBoard.css";
import TicketCard from "./TicketCard";

const groupByOptions = {
  status: ["Backlog", "Todo", "In progress", "Done", "Canceled"],
  user: ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"],
  priority: ["No priority", "Low", "Medium", "High", "Urgent"],
};

const userNames = {
  "usr-1": "Anoop Sharma",
  "usr-2": "Yogesh",
  "usr-3": "Shankar Kumar",
  "usr-4": "Ramesh",
  "usr-5": "Suresh",
};

const priorityLevels = {
  0: "No priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

function TicketBoard({ tickets, users, grouping, ordering }) {
  const groupedTickets = tickets.reduce((acc, ticket) => {
    let key;
    if (grouping === "status") {
      key = ticket.status;
    } else if (grouping === "user") {
      key = ticket.userId;
    } else if (grouping === "priority") {
      key = priorityLevels[ticket.priority];
    }
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  if (ordering === "priority") {
    Object.values(groupedTickets).forEach((group) =>
      group.sort((a, b) => b.priority - a.priority)
    );
  } else if (ordering === "title") {
    Object.values(groupedTickets).forEach((group) =>
      group.sort((a, b) => a.title.localeCompare(b.title))
    );
  }

  return (
    <div className="ticket-board">
      {groupByOptions[grouping].map((groupKey) => (
        <div className="ticket-column" key={groupKey}>
          <div className="column-header">
            <span className="column-icon">📌</span> {/* Placeholder icon */}
            {grouping === "user" ? userNames[groupKey] : groupKey}
            <span className="column-actions">...</span>{" "}
            {/* Placeholder for actions */}
          </div>
          <div className="ticket-list">
            {groupedTickets[groupKey]?.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketBoard;
