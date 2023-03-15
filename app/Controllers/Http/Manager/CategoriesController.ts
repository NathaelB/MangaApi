import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from "App/Models/Categorie";
import {StoreValidator, UpdateValidator} from "App/Validators/CategorieValidator";

export default class CategoriesController {
  public async index ({ bouncer }: HttpContextContract): Promise<Categorie[]> {
    await bouncer.with('CategoriePolicy').authorize('view')
    return Categorie.query()
  }

  public async show ({ params, bouncer }: HttpContextContract) {
    await bouncer.with('CategoriePolicy').authorize('view')
    const categorie = await Categorie.findOrFail(params.id)

    return categorie
  }

  public async store ({ request, bouncer }: HttpContextContract) {
    await bouncer.with('CategoriePolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    return Categorie.create(data)
  }

  public async update ({ request, params, bouncer }: HttpContextContract) {
    await bouncer.with('CategoriePolicy').authorize('update')
    const data = await request.validate(UpdateValidator)
    const categorie = await Categorie.findOrFail(params.id)

    return categorie.merge(data).save()
  }

  public async destroy ({ params, bouncer }: HttpContextContract) {
    await bouncer.with('CategoriePolicy').authorize('delete')
    const categorie = await Categorie.findOrFail(params.id)

    return categorie.delete()
  }
}
