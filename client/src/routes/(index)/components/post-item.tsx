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
    <Card key={node.id} className="mt-2">
      <CardHeader>
        <CardTitle>{node.title + " by " + node.author.username}</CardTitle>
        <CardDescription>{node.text}</CardDescription>
        <CardAction>
          <Button
            variant={node.voteStatus === 1 ? "destructive" : "outline"}
            size="icon-sm"
            aria-label="Upvote"
            onClick={() => handleVote(1)}
          >
            <ArrowUpIcon />
          </Button>
          <Button variant="outline" size="icon-sm">
            {node.points}
          </Button>
          <Button
            variant={node.voteStatus === -1 ? "destructive" : "outline"}
            size="icon-sm"
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
