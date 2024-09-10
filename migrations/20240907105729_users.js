export const up = function (knex) {
   return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email', 50).notNullable().unique()
      table.string('name', 50).notNullable()
      table.string('phoneNumber', 30).notNullable().unique()
      table
         .enu('status', ['active', 'inactive'])
         .notNullable()
         .defaultTo('inactive')
      table.date('registrationDate').notNullable()
      table.string('image').nullable()
      table.string('cnic', 20).notnullable().unique()
      table.enu('role', ['admin', 'user']).defaultTo('user')
      table.string('password', 100).notNullable()
      table.timestamps(true, true)
   })
}
//changes successfully updated

export const down = function (knex) {
   return knex.schema.dropTableIfExists('users')
}
