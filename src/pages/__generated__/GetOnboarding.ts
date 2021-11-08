/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExerciseFieldType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetOnboarding
// ====================================================

export interface GetOnboarding_organization_initial_exercises_fields {
  __typename: "ExerciseField";
  label: string | null;
  name: string | null;
  type: ExerciseFieldType | null;
  options: (string | null)[] | null;
}

export interface GetOnboarding_organization_initial_exercises {
  __typename: "Exercise";
  id: number | null;
  fields: (GetOnboarding_organization_initial_exercises_fields | null)[] | null;
}

export interface GetOnboarding_organization {
  __typename: "Organization";
  initial_exercises: GetOnboarding_organization_initial_exercises[];
}

export interface GetOnboarding {
  organization: GetOnboarding_organization | null;
}
