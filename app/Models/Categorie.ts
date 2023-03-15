import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "crypto";
import Product from "App/Models/Product";

export default class Categorie extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Categorie) {
    model.id = randomUUID()
  }
}
