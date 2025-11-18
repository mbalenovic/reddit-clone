import { DataSource } from "typeorm";
import { Post } from "../entities/post.entity";
import { Upvote } from "../entities/upvote.entity";
import { BaseService } from "./base.service";

export class UpvoteService extends BaseService<Upvote> {
  constructor(AppDataSource: DataSource) {
    super(AppDataSource, Upvote);
  }
  async vote(userId: number, postId: number, value: number) {
    const upvote = await this.find({ postId, userId });

    if (upvote === null) {
      const upvote = new Upvote();
      upvote.postId = postId;
      upvote.userId = userId;
      upvote.value = value;

      // save upvote and add to the points
      return this.AppDataSource.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(upvote);

          const post = await transactionalEntityManager.findOneBy(Post, {
            id: postId,
          });

          if (!post) {
            return null;
          }

          post.points = post.points + value;

          const updatedPost = await transactionalEntityManager.save(post);
          updatedPost.voteStatus = value;
          return updatedPost;
        }
      );
    } else {
      if (upvote.value === value) {
        // remove upvote and the point
        return this.AppDataSource.transaction(
          async (transactionalEntityManager) => {
            await transactionalEntityManager.delete(Upvote, upvote);

            const post = await transactionalEntityManager.findOneBy(Post, {
              id: postId,
            });

            if (!post) {
              return null;
            }

            post.points = post.points - value;

            const updatedPost = await transactionalEntityManager.save(post);
            updatedPost.voteStatus = null;
            return updatedPost;
          }
        );
      }

      // update upvote and points
      return this.AppDataSource.transaction(
        async (transactionalEntityManager) => {
          upvote.value = value;
          await transactionalEntityManager.save(upvote);

          const post = await transactionalEntityManager.findOneBy(Post, {
            id: postId,
          });

          if (!post) {
            return null;
          }

          post.points = post.points + 2 * value;

          const updatedPost = await transactionalEntityManager.save(post);
          updatedPost.voteStatus = value;
          return updatedPost;
        }
      );
    }
  }
}
