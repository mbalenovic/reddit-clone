import { DataSource } from "typeorm";
import { Post } from "../entities/post.entity";
import { Upvote } from "../entities/upvote.entity";
import { BaseService } from "./base.service";

export class UpvoteService extends BaseService<Upvote> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Upvote);
  }
  async vote(userId: number, postId: number, value: number) {
    return this.AppDataSource.transaction(async (em) => {
      const existing = await em.findOne(Upvote, {
        where: { postId, userId },
      });

      let pointDelta = 0;
      let voteStatus: number | null = null;

      // create new upvote
      if (!existing) {
        const newVote = em.create(Upvote, { userId, postId, value });
        await em.save(newVote);

        pointDelta = value;
        voteStatus = value;
      }

      // remove the vote
      else if (existing.value === value) {
        await em.remove(existing);

        pointDelta = -value;
        voteStatus = null;
      }

      // switching vote (e.g., upvote → downvote)
      else {
        existing.value = value;
        await em.save(existing);

        pointDelta = 2 * value;
        voteStatus = value;
      }

      // update post points
      const post = await em.findOne(Post, { where: { id: postId } });
      if (!post) return null;

      post.points += pointDelta;
      const updated = await em.save(post);

      (updated as any).voteStatus = voteStatus;
      return updated;
    });
  }
}
