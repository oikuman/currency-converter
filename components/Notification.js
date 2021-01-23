import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Notification = () => {
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Все вдалося", "Ура");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };

  return (
    <div>
      <button onClick={createNotification("info")}>Info</button>
      <Button
        variant="contained"
        color="primary"
        onClick={createNotification("success")}
      >
        Успіх
      </Button>
      <button onClick={createNotification("warning")}>Warning</button>
      <Button
        variant="contained"
        color="secondary"
        onClick={createNotification("error")}
      >
        Жахлива помилка
      </Button>

      <NotificationContainer />
    </div>
  );
};

export default Notification;
