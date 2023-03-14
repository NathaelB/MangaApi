import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from "App/Models/Permission";

export default class PermissionsController {
  public async index () {
    return Permission.query()
      .preload('roles')
      .preload('users')
  }

  public async show ({ params }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)
    await permission.load('users')
    await permission.load('roles')

    return permission
  }
}
