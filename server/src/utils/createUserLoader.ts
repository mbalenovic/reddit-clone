import DataLoader from "dataloader";
import { UserService } from "../services/user.service";
import AppDataSource from "../typeorm.config";

const userService = new UserService(AppDataSource);

export const createUserLoader = () =>
  new DataLoader(async (ids: readonly number[]) => {
    const users = await userService.findByIds(ids);
    const userMap = new Map(users.map((user) => [user.id, user]));

    return ids.map((id) => userMap.get(id) || new Error(`No result for ${id}`));
  });
