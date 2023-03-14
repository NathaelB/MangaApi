import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
  public async index ({ bouncer }: HttpContextContract): Promise<User[]> {
    await bouncer.with('UserPolicy').authorize('view')

    return User.query()
      .preload('permissions')
      .preload('roles')
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    const user = await User.findOrFail(params.id)
    await user.load('permissions')
    await user.load('roles', (query) => {
      query.preload('permissions')
    })
  }

  public async store ({ bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')
  }

  public async update ({ bouncer, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('update', user)

  }

  public async destroy ({ bouncer, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('delete', user)
  }
}
