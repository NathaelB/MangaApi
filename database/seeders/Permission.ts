import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from "App/Models/Permission";

export default class extends BaseSeeder {
  public async run () {
    await Permission.createMany([
      {key: 'admin'},

      {key: 'user:view'},
      {key: 'user:store'},
      {key: 'user:update'},
      {key: 'user:delete'},

      {key: 'role:view'},
      {key: 'role:store'},
      {key: 'role:update'},
      {key: 'role:delete'},

      {key: 'permission:view'},

      {key: 'categories:view'},
      {key: 'categories:store'},
      {key: 'categories:update'},
      {key: 'categories:delete'},

      {key: 'product:view'},
      {key: 'product:store'},
      {key: 'product:update'},
      {key: 'product:delete'},
    ])
  }
}
