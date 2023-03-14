import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name')
      table.string('code').unique()
      table.integer('quantity').defaultTo(1)
      table.text('details')
      table.integer('price').defaultTo(0)
      table.string('categorie_id').references('id')
        .inTable('categories').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
