import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from 'crypto'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid (model: User) {
    model.id = randomUUID()
  }
}
