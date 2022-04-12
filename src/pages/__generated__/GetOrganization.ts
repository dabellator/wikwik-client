/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrganization
// ====================================================

export interface GetOrganization_getOrganization {
  __typename: "Organization";
  id: number | null;
  name: string | null;
  host: string | null;
  context_info: string | null;
}

export interface GetOrganization {
  getOrganization: GetOrganization_getOrganization | null;
}

export interface GetOrganizationVariables {
  hostName?: string | null;
}
