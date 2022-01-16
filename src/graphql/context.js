import { getUsers } from "./user/api"
import { getPosts } from "./post/api"
import { createUsersDataloader } from "./user/dataloaders"

export function context() {
    return {
        getUsers,
        usersDataloader: createUsersDataloader(getUsers),
        getPosts
    }
}
