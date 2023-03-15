import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import HelperPolicy from 'App/Policies/HelperPolicy'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class UserPolicy extends BasePolicy {
  public async before (user: User): Promise<true | undefined> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('user:view')
      || permissions.includes('user:store')
      || permissions.includes('user:update')
      || permissions.includes('user:delete')
  }

  public async store (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('user:store')
  }

  public async update (currentUser: User, user: User): Promise<boolean> {
    const roleCurrentUser: Role = await HelperPolicy.getMaxRole(currentUser)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleCurrentUser.power <= roleUser.power) return false

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('user:update')
  }

  public async delete (currentUser: User, user: User) {
    const roleCurrentUser: Role = await HelperPolicy.getMaxRole(currentUser)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleCurrentUser.power <= roleUser.power) return false

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('user:delete')
  }
}
