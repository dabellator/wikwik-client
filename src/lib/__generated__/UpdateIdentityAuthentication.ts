/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateIdentityAuthentication
// ====================================================

export interface UpdateIdentityAuthentication_updateIdentityAuthentication {
  __typename: "Identity";
  id: number | null;
}

export interface UpdateIdentityAuthentication {
  updateIdentityAuthentication: UpdateIdentityAuthentication_updateIdentityAuthentication | null;
}

export interface UpdateIdentityAuthenticationVariables {
  authToken: string;
  anonID: string;
}
