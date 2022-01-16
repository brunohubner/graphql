import { getUsers } from "./users/api"
import { getPosts } from "./posts/api"
import { createUsersDataloader } from "./users/dataloaders"
import { createPostsDataloader } from "./posts/dataloaders"

export function context() {
    return {
        getUsers,
        usersDataloader: createUsersDataloader(getUsers),
        getPosts,
        postsDataloader: createPostsDataloader(getPosts)
    }
}
