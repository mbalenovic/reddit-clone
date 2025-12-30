import { PostsQuery } from "@/gql/graphql";
import PostItem from "./post-item";

export default function ({ edges }: { edges: PostsQuery["posts"]["edges"] }) {
  return (
    <div className="space-y-4">
      {edges.map(({ node }) => (
        <PostItem node={node} key={node.id} />
      ))}
    </div>
  );
}
