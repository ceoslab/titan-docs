import React from "react";
import ColorModeToggle from "@theme-original/ColorModeToggle";
import { useAuth } from "../keycloak";

export default function ColorModeToggleWrapper(props) {
  const { doLogout } = useAuth;
  return (
    <>
      <a
        style={{ marginRight: 15, cursor: "pointer" }}
        onClick={() => doLogout()}
        className="logoutButton"
      >
        Sair
      </a>
      <ColorModeToggle {...props} />
    </>
  );
}
