import React from "react";

const Notification = ({ alert }) => {
  return (
    <div className={`notification ${alert && alert.level}`}>
      {alert ? alert.message : "\u00A0"}
    </div>
  );
};

export default Notification;
