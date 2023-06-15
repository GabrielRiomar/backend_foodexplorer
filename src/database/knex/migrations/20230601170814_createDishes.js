exports.up = knex =>
  knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('category')
    table.decimal('price', 14, 2).notNullable()
    table.text('description')
    table.text('image').nullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTable('dishes')
