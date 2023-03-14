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
    return permissions.includes('view:user')
      || permissions.includes('store:user')
      || permissions.includes('update:user')
      || permissions.includes('destroy:user')
  }

  public async store (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('store:user')
  }

  public async update (currentUser: User, user: User): Promise<boolean> {
    const roleCurrentUser: Role = await HelperPolicy.getMaxRole(currentUser)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleCurrentUser.power <= roleUser.power) return false

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('update:user')
  }

  public async delete (currentUser: User, user: User) {
    const roleCurrentUser: Role = await HelperPolicy.getMaxRole(currentUser)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleCurrentUser.power <= roleUser.power) return false

    const permissions: string[] = await HelperPolicy.getPermissions(currentUser)
    return permissions.includes('delete:user')
  }
}
