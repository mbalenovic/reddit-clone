/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n": typeof types.UserFragmentFragmentDoc,
    "\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n": typeof types.QueryDocument,
    "\n  query Posts {\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n    }\n  }\n": typeof types.PostsDocument,
};
const documents: Documents = {
    "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n": types.UserFragmentFragmentDoc,
    "\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n": types.QueryDocument,
    "\n  query Posts {\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n    }\n  }\n": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts {\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n    }\n  }\n"): (typeof documents)["\n  query Posts {\n    posts {\n      id\n      createdAt\n      updatedAt\n      title\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;