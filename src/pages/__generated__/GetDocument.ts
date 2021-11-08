/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDocument
// ====================================================

export interface GetDocument_organization_initial_exercises {
  __typename: "Exercise";
  id: number | null;
  name: string | null;
}

export interface GetDocument_organization {
  __typename: "Organization";
  initial_exercises: GetDocument_organization_initial_exercises[];
}

export interface GetDocument_getMyResponses_values {
  __typename: "ResponseValue";
  value: string | null;
  id: number | null;
}

export interface GetDocument_getMyResponses {
  __typename: "Response";
  values: (GetDocument_getMyResponses_values | null)[] | null;
  exercise_id: number | null;
}

export interface GetDocument {
  organization: GetDocument_organization | null;
  getMyResponses: (GetDocument_getMyResponses | null)[] | null;
}
