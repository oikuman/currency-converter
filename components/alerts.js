import {
  //   NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const createWarning = (title, text) =>
  NotificationManager.warning(text, title, 3000);

export const createSuccess = (title, text) =>
  NotificationManager.success(text, title);
