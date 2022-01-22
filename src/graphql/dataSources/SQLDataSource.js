import { DataSource } from "apollo-datasource"
import { InMemoryLRUCache } from "apollo-server-caching"
import DataLoader from "dataloader"

export class SQLDataSource extends DataSource {
    /**
     * @param { import("knex").Knex } dbConnection
     */
    constructor(dbConnection) {
        super()
        this.db = dbConnection
        this._loader = new DataLoader(async ids =>
            this.batchLoaderCallback(ids)
        )
    }

    initialize({ context, cache }) {
        this.context = context
        this.cache = cache || new InMemoryLRUCache()
    }

    async batchLoad(id) {
        return this._loader.load(id)
    }

    async batchLoaderCallback(_ids) {
        return _ids
    }
}
