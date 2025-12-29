import { graphql } from "@/gql";
import { useMutation } from "@apollo/client/react";
import { POSTS } from "../queries/usePostsQuery";

const CREATE_POST = graphql(`
  mutation CreatePost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
      id
      createdAt
      updatedAt
      title
      text
      points
      authorId
    }
  }
`);

export function useCreatePostMutation() {
  return useMutation(CREATE_POST, {
    refetchQueries: [{ query: POSTS, variables: { first: 10 } }],
    // OR update cache
    // update(cache, { data }) {
    //   if (!data?.createPost) return;

    //   cache.modify({
    //     fields: {
    //       posts(existingPosts = []) {
    //         const newPostRef = cache.writeFragment({
    //           data: data.createPost,
    //           fragment: graphql(`
    //             fragment NewPost on Post {
    //               id
    //               createdAt
    //               updatedAt
    //               title
    //               text
    //               points
    //               authorId
    //             }
    //           `),
    //         });
    //         return [...existingPosts, newPostRef];
    //       },
    //     },
    //   });
    // },
  });
}
