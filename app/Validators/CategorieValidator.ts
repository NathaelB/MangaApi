import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'categories', column: 'name'})
    ])
  })

  public messages: CustomMessages = {}
}


export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'categories', column: 'name'})
    ])
  })

  public messages: CustomMessages = {}
}
