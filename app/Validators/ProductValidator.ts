import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    code: schema.string({ trim: true }, [
      rules.unique({ table: 'products', column: 'code'})
    ]),
    quantity: schema.number(),
    details: schema.string({ trim: true }),
    price: schema.number(),
    categorie_id: schema.string({ trim: true }, [
      rules.exists({ table: 'categories', column: 'id'})
    ])
  })

  public messages: CustomMessages = {}
}

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    code: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'products', column: 'code'})
    ]),
    quantity: schema.number.optional(),
    details: schema.string.optional({ trim: true }),
    price: schema.number.optional(),
    categorie_id: schema.string.optional({ trim: true }, [
      rules.exists({ table: 'categories', column: 'id'})
    ])
  })

  public messages: CustomMessages = {}
}
