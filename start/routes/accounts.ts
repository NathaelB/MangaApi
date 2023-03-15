import Route from '@ioc:Adonis/Core/Route'

const accountsRoute = () => Route.group(() => {
  Route.group(() => {
    Route.get('/', 'Manager/UsersController.index')
    Route.get('/:id', 'Manager/UsersController.show')

    Route.post('/', 'Manager/UsersController.store')
    Route.put('/:id', 'Manager/UsersController.update')
    Route.delete('/:id', 'Manager/UsersController.delete')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/', 'Manager/RolesController.index')
    Route.get('/:id', 'Manager/RolesController.show')

    Route.post('/', 'Manager/RolesController.store')
    Route.put('/:id', 'Manager/RolesController.update')
    Route.delete('/:id', 'Manager/RolesController.delete')
  }).prefix('/roles')

  Route.group(() => {
    Route.get('/', 'Manager/PermissionsController.index')
    Route.get('/:id', 'Manager/PermissionsController.show')
  }).prefix('/permissions')
}).prefix('/account')

export default accountsRoute
