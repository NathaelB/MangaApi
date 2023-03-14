import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from "App/Models/Permission";
import Role from "App/Models/Role";

export default class extends BaseSeeder {
  public async run () {
    const permission = await Permission.findByOrFail('key', 'admin')

    const role = await Role.create({
      power: 100,
      key: 'admin',
      label: 'Administrateur'
    })

    await role.related('permissions').create(permission)
  }
}
