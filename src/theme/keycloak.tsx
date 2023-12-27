import { KEYCLOAK_CONFIG } from "../constants/keycloakConfig";
import Keycloak from "keycloak-js";

const _kc = new Keycloak(KEYCLOAK_CONFIG);

const initKeycloak = (onAuthenticatedCallback: () => void) => {
  _kc
    .init({
      onLoad: "login-required",
      checkLoginIframe: false,
    })
    .then(authenticated => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      _kc.onTokenExpired = () => {
        _kc.updateToken(300);
      };
      onAuthenticatedCallback();
    })
    .catch(console.error);
    
};

const isLoggedIn = () => !!_kc.token;

const doLogout = () => _kc.logout();

export const useAuth = {
  initKeycloak, isLoggedIn, doLogout
};

