import { PostsQuery } from "@/gql/graphql";
import PostItem from "./post-item";

export default function ({ edges }: { edges: PostsQuery["posts"]["edges"] }) {
  return (
    <>
      {edges.map(({ node }) => (
        <PostItem node={node} key={node.id} />
      ))}
    </>
  );
}
