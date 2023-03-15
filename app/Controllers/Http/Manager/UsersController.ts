import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import {StoreValidator, UpdateValidator} from "App/Validators/UserValidator";

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

  public async store ({ request, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    return User.create(data)
  }

  public async update ({ bouncer, params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('update', user)

    const data = await request.validate(UpdateValidator)

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }

    return user.merge(data).save()
  }

  public async destroy ({ bouncer, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('UserPolicy').authorize('delete', user)

    await user.delete()
  }
}
