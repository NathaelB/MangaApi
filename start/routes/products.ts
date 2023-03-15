import Route from '@ioc:Adonis/Core/Route'

const productsRoute = () => Route.group(() => {
  Route.get('/', 'Manager/ProductsController.index')
  Route.get('/:id', 'Manager/v.show')

  Route.post('/', 'Manager/ProductsController.store')
  Route.put('/:id', 'Manager/ProductsController.update')
  Route.delete('/:id', 'Manager/ProductsController.delete')
}).prefix('/products')

export default productsRoute
