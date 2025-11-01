import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PostsQuery } from "@/gql/graphql";

function PostItem({
  node,
}: {
  node: PostsQuery["posts"]["edges"][number]["node"];
}) {
  return (
    <Card key={node.id} className="mt-2">
      <CardHeader>
        <CardTitle>{node.title + " by " + node.author.username}</CardTitle>
        <CardDescription>{node.text}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default PostItem;
