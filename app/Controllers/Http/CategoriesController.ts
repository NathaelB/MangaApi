import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from "App/Models/Categorie";
import {StoreValidator, UpdateValidator} from "App/Validators/CategorieValidator";

export default class CategoriesController {
  public async index ({}: HttpContextContract): Promise<Categorie[]> {
    return Categorie.query()
  }

  public async show ({ params }: HttpContextContract) {
    const categorie = await Categorie.findOrFail(params.id)

    return categorie
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return Categorie.create(data)
  }

  public async update ({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const categorie = await Categorie.findOrFail(params.id)

    return categorie.merge(data).save()
  }

  public async destroy ({ params }: HttpContextContract) {
    const categorie = await Categorie.findOrFail(params.id)

    return categorie.delete()
  }
}
