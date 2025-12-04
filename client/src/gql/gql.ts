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
    "\n  fragment PostFragment on Post {\n    id\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    authorId\n    voteStatus\n  }\n": typeof types.PostFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n": typeof types.UserFragmentFragmentDoc,
    "\n  mutation CreatePost($postInput: PostInput!) {\n    createPost(postInput: $postInput) {\n      id\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      authorId\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id)\n  }\n": typeof types.DeletePostDocument,
    "\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation PasswordRecovery($email: String!) {\n    passwordRecovery(email: $email)\n  }\n": typeof types.PasswordRecoveryDocument,
    "\n  mutation UpdatePassword($recoveryToken: String!, $password: String!) {\n    updatePassword(recoveryToken: $recoveryToken, password: $password)\n  }\n": typeof types.UpdatePasswordDocument,
    "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {\n    updatePost(id: $id, title: $title, text: $text) {\n      ...PostFragment\n    }\n  }\n": typeof types.UpdatePostDocument,
    "\n  mutation Vote($postId: Int!, $value: Int!) {\n    vote(postId: $postId, value: $value) {\n      id\n      points\n      voteStatus\n    }\n  }\n": typeof types.VoteDocument,
    "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n": typeof types.QueryDocument,
    "\n  query Post($id: Int!) {\n    post(id: $id) {\n      ...PostFragment\n      author {\n        id\n        username\n      }\n    }\n  }\n": typeof types.PostDocument,
    "\n  query Posts($first: Float!, $after: String) {\n    posts(first: $first, after: $after) {\n      edges {\n        node {\n          ...PostFragment\n          author {\n            username\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.PostsDocument,
    "\n  query User($userId: Float!) {\n    user(userId: $userId) {\n      ...UserFragment\n    }\n  }\n": typeof types.UserDocument,
};
const documents: Documents = {
    "\n  fragment PostFragment on Post {\n    id\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    authorId\n    voteStatus\n  }\n": types.PostFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n": types.UserFragmentFragmentDoc,
    "\n  mutation CreatePost($postInput: PostInput!) {\n    createPost(postInput: $postInput) {\n      id\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      authorId\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id)\n  }\n": types.DeletePostDocument,
    "\n  mutation Login($userInputLogin: UserInputLogin!) {\n    login(userInputLogin: $userInputLogin) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation PasswordRecovery($email: String!) {\n    passwordRecovery(email: $email)\n  }\n": types.PasswordRecoveryDocument,
    "\n  mutation UpdatePassword($recoveryToken: String!, $password: String!) {\n    updatePassword(recoveryToken: $recoveryToken, password: $password)\n  }\n": types.UpdatePasswordDocument,
    "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {\n    updatePost(id: $id, title: $title, text: $text) {\n      ...PostFragment\n    }\n  }\n": types.UpdatePostDocument,
    "\n  mutation Vote($postId: Int!, $value: Int!) {\n    vote(postId: $postId, value: $value) {\n      id\n      points\n      voteStatus\n    }\n  }\n": types.VoteDocument,
    "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n": types.QueryDocument,
    "\n  query Post($id: Int!) {\n    post(id: $id) {\n      ...PostFragment\n      author {\n        id\n        username\n      }\n    }\n  }\n": types.PostDocument,
    "\n  query Posts($first: Float!, $after: String) {\n    posts(first: $first, after: $after) {\n      edges {\n        node {\n          ...PostFragment\n          author {\n            username\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.PostsDocument,
    "\n  query User($userId: Float!) {\n    user(userId: $userId) {\n      ...UserFragment\n    }\n  }\n": types.UserDocument,
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
export function graphql(source: "\n  fragment PostFragment on Post {\n    id\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    authorId\n    voteStatus\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n    id\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    authorId\n    voteStatus\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($postInput: PostInput!) {\n    createPost(postInput: $postInput) {\n      id\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      authorId\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($postInput: PostInput!) {\n    createPost(postInput: $postInput) {\n      id\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: Int!) {\n    deletePost(id: $id)\n  }\n"];
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
export function graphql(source: "\n  mutation PasswordRecovery($email: String!) {\n    passwordRecovery(email: $email)\n  }\n"): (typeof documents)["\n  mutation PasswordRecovery($email: String!) {\n    passwordRecovery(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePassword($recoveryToken: String!, $password: String!) {\n    updatePassword(recoveryToken: $recoveryToken, password: $password)\n  }\n"): (typeof documents)["\n  mutation UpdatePassword($recoveryToken: String!, $password: String!) {\n    updatePassword(recoveryToken: $recoveryToken, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($userInput: UserInput!) {\n    register(userInput: $userInput) {\n      errors {\n        field\n        message\n      }\n      user {\n        ...UserFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {\n    updatePost(id: $id, title: $title, text: $text) {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePost($id: Int!, $title: String!, $text: String!) {\n    updatePost(id: $id, title: $title, text: $text) {\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Vote($postId: Int!, $value: Int!) {\n    vote(postId: $postId, value: $value) {\n      id\n      points\n      voteStatus\n    }\n  }\n"): (typeof documents)["\n  mutation Vote($postId: Int!, $value: Int!) {\n    vote(postId: $postId, value: $value) {\n      id\n      points\n      voteStatus\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query Query {\n    me {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Post($id: Int!) {\n    post(id: $id) {\n      ...PostFragment\n      author {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query Post($id: Int!) {\n    post(id: $id) {\n      ...PostFragment\n      author {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($first: Float!, $after: String) {\n    posts(first: $first, after: $after) {\n      edges {\n        node {\n          ...PostFragment\n          author {\n            username\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query Posts($first: Float!, $after: String) {\n    posts(first: $first, after: $after) {\n      edges {\n        node {\n          ...PostFragment\n          author {\n            username\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($userId: Float!) {\n    user(userId: $userId) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query User($userId: Float!) {\n    user(userId: $userId) {\n      ...UserFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;