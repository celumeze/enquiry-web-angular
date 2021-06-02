import { AuthenticationResult } from "@azure/msal-browser";

export interface Payload extends AuthenticationResult {
    idTokenClaims: {
      tfp?: string
    }
  }