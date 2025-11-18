import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { PostsQuery } from "@/gql/graphql";
import { useVoteMutation } from "@/graphql/mutations/useVoteMutation";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Route as PostRoute } from "@/routes/posts/$postId";
import { Link } from "@tanstack/react-router";

function PostItem({
  node,
}: {
  node: PostsQuery["posts"]["edges"][number]["node"];
}) {
  const [vote] = useVoteMutation();

  function handleVote(value: 1 | -1) {
    vote({ variables: { value, postId: node.id } });
  }

  return (
    <Card className="mt-2">
      <CardHeader>
        <Link to={PostRoute.to} params={{ postId: node.id.toString() }}>
          <CardTitle>{node.title + " by " + node.author.username}</CardTitle>
        </Link>
        <CardDescription>{node.text}</CardDescription>
        <CardAction className="flex items-center">
          <Button
            aria-label="Upvote"
            onClick={() => handleVote(1)}
            className={`${node.voteStatus === 1 ? "bg-red-500 hover:bg-red-500" : ""} w-6 h-6`}
          >
            <ArrowUpIcon />
          </Button>
          <Button variant="outline" size="icon-sm" className="m-1">
            {node.points}
          </Button>
          <Button
            className={`${node.voteStatus === -1 ? "bg-red-500 hover:bg-red-500" : ""} w-6 h-6`}
            aria-label="Downvote"
            onClick={() => handleVote(-1)}
          >
            <ArrowDownIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export default PostItem;
