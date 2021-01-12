import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Converter",
    path: "/converter",
    icon: <FontAwesomeIcon icon={faCompass} />,
  },
  {
    label: "Currency Rates",
    path: "/",
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  },
];

export default navButtons;
