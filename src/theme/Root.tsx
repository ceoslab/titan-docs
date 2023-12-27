import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./keycloak";
import "../css/login.css";

export default function Root({ children }) {
  const { initKeycloak, isLoggedIn } = useAuth;

  useEffect(() => {
    initKeycloak(children);
  }, []);

  const isAllow = () => {
    return isLoggedIn;
  };

  return <React.Fragment>{isAllow() && children}</React.Fragment>;
}
