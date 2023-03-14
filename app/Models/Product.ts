import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "crypto";
import Categorie from "App/Models/Categorie";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public quantity: number

  @column()
  public details: string

  @column()
  public price: number

  @column()
  public categorieId: string

  @belongsTo(() => Categorie, {
    foreignKey: 'categorieId'
  })
  public categorie: BelongsTo<typeof Categorie>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Product) {
    model.id = randomUUID()
  }
}
