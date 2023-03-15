import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('PermissionPolicy').authorize('view')
    return Permission.query()
      .preload('roles')
      .preload('users')
  }

  public async show ({ params, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionPolicy').authorize('view')

    const permission = await Permission.findOrFail(params.id)
    await permission.load('users')
    await permission.load('roles')

    return permission
  }
}
