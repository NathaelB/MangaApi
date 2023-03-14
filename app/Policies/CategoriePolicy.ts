import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'

export default class CategoriePolicy extends BasePolicy {
  public async before (user: User): Promise<true | undefined> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('categorie:view')
      || permissions.includes('categorie:store')
      || permissions.includes('categorie:update')
      || permissions.includes('categorie:delete')
  }

  public async store (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('categorie:store')
  }

  public async update (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)

    return permissions.includes('categorie:store')
  }

  public async delete (user: User): Promise<boolean> {
    const permissions: string[] = await HelperPolicy.getPermissions(user)

    return permissions.includes('categorie:delete')
  }
}
