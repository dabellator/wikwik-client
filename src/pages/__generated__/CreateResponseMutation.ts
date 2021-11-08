/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResponseValueInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateResponseMutation
// ====================================================

export interface CreateResponseMutation_createResponse_values {
  __typename: "ResponseValue";
  id: number | null;
  name: string | null;
  value: string | null;
}

export interface CreateResponseMutation_createResponse {
  __typename: "Response";
  id: number | null;
  values: (CreateResponseMutation_createResponse_values | null)[] | null;
}

export interface CreateResponseMutation {
  createResponse: CreateResponseMutation_createResponse;
}

export interface CreateResponseMutationVariables {
  exercise: number;
  values?: (ResponseValueInput | null)[] | null;
}
