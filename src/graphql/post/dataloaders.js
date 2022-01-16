import DataLoader from "dataloader"

export function createPostsDataloader(getPosts) {
    return new DataLoader(async ids => {
        const urlQuery = ids.join("&userId=")
        const post = await getPosts("?userId=" + urlQuery)
        return ids.map(id => post.filter(post => post.userId === id))
    })
}
