import React, { useEffect } from "react";

const Alert = ({ message, type, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
  }, []);
  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
