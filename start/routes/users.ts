import Route from '@ioc:Adonis/Core/Route'

const usersRoute = () => Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')

    Route.post('/', 'UsersController.store')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.delete')
  }).prefix('/users')
}).prefix('/account').middleware('auth')

export default usersRoute