import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'

export default class PermissionPolicy extends BasePolicy {
  public async before (user: User): Promise<true | undefined> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('permission:view')
  }
}
