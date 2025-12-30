import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostsQuery } from "@/gql/graphql";
import { useVoteMutation } from "@/graphql/mutations/useVoteMutation";
import { Route as PostRoute } from "@/routes/posts/$postId";
import { Link } from "@tanstack/react-router";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

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
    <Card className="p-0">
      <div className="flex gap-3 p-4">
        {/* Vote Component - Vertical Layout */}
        <div className="flex flex-col items-center gap-1 min-w-10">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Upvote"
            onClick={() => handleVote(1)}
            className={
              node.voteStatus === 1
                ? "text-primary hover:text-primary hover:bg-primary/10 bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-accent"
            }
          >
            <ArrowBigUp
              className="size-5"
              fill={node.voteStatus === 1 ? "currentColor" : "none"}
            />
          </Button>
          <span
            className={`text-sm font-bold text-center ${
              node.voteStatus === 1
                ? "text-primary"
                : node.voteStatus === -1
                  ? "text-destructive"
                  : "text-foreground"
            }`}
          >
            {node.points}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Downvote"
            onClick={() => handleVote(-1)}
            className={
              node.voteStatus === -1
                ? "text-destructive hover:text-destructive hover:bg-destructive/10 bg-destructive/10"
                : "text-muted-foreground hover:text-destructive hover:bg-accent"
            }
          >
            <ArrowBigDown
              className="size-5"
              fill={node.voteStatus === -1 ? "currentColor" : "none"}
            />
          </Button>
        </div>

        {/* Post Content */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <Link to={PostRoute.to} params={{ postId: node.id.toString() }}>
            <h3 className="font-semibold hover:text-primary transition-colors text-base leading-tight">
              {node.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground">
            by {node.author.username}
          </p>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {node.text}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default PostItem;
