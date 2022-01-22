/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return await knex.schema.createTable("comments", table => {
        table.uuid("id").primary().defaultTo(knex.raw("(UUID())"))
        table.text("comment").notNullable()
        table.uuid("user_id").notNullable()
        table.uuid("post_id").notNullable()
        table.timestamps(true, true)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    return await knex.schema.dropTable("comments")
}
