/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExerciseFieldType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetOnboarding
// ====================================================

export interface GetOnboarding_getOrganization_initial_exercises_fields {
  __typename: "ExerciseField";
  label: string | null;
  name: string | null;
  type: ExerciseFieldType | null;
  options: (string | null)[] | null;
}

export interface GetOnboarding_getOrganization_initial_exercises {
  __typename: "Exercise";
  id: number | null;
  fields: (GetOnboarding_getOrganization_initial_exercises_fields | null)[] | null;
}

export interface GetOnboarding_getOrganization {
  __typename: "Organization";
  initial_exercises: GetOnboarding_getOrganization_initial_exercises[];
}

export interface GetOnboarding_getMyResponses_values {
  __typename: "ResponseValue";
  name: string | null;
  value: string | null;
  response_id: number | null;
}

export interface GetOnboarding_getMyResponses {
  __typename: "Response";
  exercise_id: number | null;
  values: (GetOnboarding_getMyResponses_values | null)[] | null;
}

export interface GetOnboarding {
  getOrganization: GetOnboarding_getOrganization | null;
  getMyResponses: (GetOnboarding_getMyResponses | null)[] | null;
}

export interface GetOnboardingVariables {
  hostName?: string | null;
}
