import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import {StoreValidator, UpdateValidator} from "App/Validators/ProductValidator";

export default class ProductsController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('view')
    return Product.query()
      .preload('categorie')
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('view')
    const product = await Product.findOrFail(params.id)
    await product.load('categorie')

    return product
  }

  public async store ({ bouncer, request }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    return Product.create(data)
  }

  public async update ({ bouncer, request, params }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('update')
    const data = await request.validate(UpdateValidator)
    const product = await Product.findOrFail(params.id)

    return product.merge(data).save()
  }

  public async destroy ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('delete')
    const product = await Product.findOrFail(params.id)

    return product.delete()
  }
}
