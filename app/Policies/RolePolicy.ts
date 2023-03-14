import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'
import Role from 'App/Models/Role'

export default class RolePolicy extends BasePolicy {
  public async before (user: User): Promise<true | undefined> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('role:view')
      || permissions.includes('role:store')
      || permissions.includes('role:update')
      || permissions.includes('role:delete')
  }

  public async store (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('role:store')
  }

  public async update (user: User, role: Role): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleUser.power <= role.power) return false

    return permissions.includes('role:store')
  }

  public async delete (user: User, role: Role): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    const roleUser: Role = await HelperPolicy.getMaxRole(user)

    if (roleUser.power <= role.power) return false

    return permissions.includes('role:delete')
  }
}
