import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "crypto";

export default class Categorie extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Categorie) {
    model.id = randomUUID()
  }
}
