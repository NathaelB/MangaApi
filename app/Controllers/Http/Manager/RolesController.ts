import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "App/Models/Role";
import {StoreValidator, UpdateValidator} from "App/Validators/RoleValidator";

export default class RolesController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query()
      .preload('users')
      .preload('permissions')
  }

  public async show ({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const role = await Role.findOrFail(params.id)
    await role.load('permissions')
    await role.load('users')

    return role
  }

  public async store ({ request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    return Role.create(data)
  }

  public async update ({ request, params, bouncer }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await bouncer.with('RolePolicy').authorize('update', role)

    const data = await request.validate(UpdateValidator)

    return role.merge(data).save()
  }

  public async destroy ({ params, bouncer }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await bouncer.with('RolePolicy').authorize('delete', role)
    return role.delete()
  }
}
