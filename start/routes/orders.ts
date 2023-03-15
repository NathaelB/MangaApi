import Route from '@ioc:Adonis/Core/Route'

const ordersRoute = () => Route.group(() => {
  Route.get('/', 'Manager/OrdersController.index')
  Route.get('/:id', 'Manager/OrdersController.show')

  Route.post('/', 'Manager/OrdersController.store')
  Route.put('/:id', 'Manager/OrdersController.update')
  Route.delete('/:id', 'Manager/OrdersController.delete')
}).prefix('/orders')

export default ordersRoute
