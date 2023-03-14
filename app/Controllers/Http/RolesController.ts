import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "App/Models/Role";
import {StoreValidator, UpdateValidator} from "App/Validators/RoleValidator";

export default class RolesController {
  public async index () {
    return Role.query()
      .preload('users')
      .preload('permissions')
  }

  public async show ({ params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await role.load('permissions')
    await role.load('users')
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return Role.create(data)
  }

  public async update ({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const role = await Role.findOrFail(params.id)

    return role.merge(data).save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return role.delete()
  }
}
