import { KeycloakConfig } from "keycloak-js";

export const KEYCLOAK_CONFIG: KeycloakConfig = {
  url: "https://demo.titan.ceoslab.app/auth",
  realm: "quarkus",
  clientId: "frontend-service-local-docs",
};