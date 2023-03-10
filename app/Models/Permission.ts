import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import User from 'App/Models/User'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public key: string

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Permission) {
    model.id = randomUUID()
  }
}
