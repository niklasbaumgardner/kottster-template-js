import { getEnvOrThrow } from "@kottster/common";
import { createApp, createIdentityProvider } from "@kottster/server";
import schema from "../../kottster-app.json";

const SECRET_KEY = getEnvOrThrow("SECRET_KEY");
const JWT_SECRET_SALT = getEnvOrThrow("JWT_SECRET_SALT");
const ROOT_USER_PASSWORD = getEnvOrThrow("ROOT_USER_PASSWORD");

/*
 * For security, consider moving the secret data to environment variables.
 * See https://kottster.app/docs/deploying#before-you-deploy
 */
export const app = createApp({
  schema,
  secretKey: SECRET_KEY,

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider("sqlite", {
    fileName: "app.db",

    passwordHashAlgorithm: "bcrypt",
    jwtSecretSalt: JWT_SECRET_SALT,

    /* The root admin user credentials */
    rootUsername: "admin",
    rootPassword: ROOT_USER_PASSWORD,
  }),
});
