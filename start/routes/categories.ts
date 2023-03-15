import Route from '@ioc:Adonis/Core/Route'

const categoriesRoute = () => Route.group(() => {
  Route.get('/', 'Manager/CategoriesController.index')
  Route.get('/:id', 'Manager/CategoriesController.show')

  Route.post('/', 'Manager/CategoriesController.store')
  Route.put('/:id', 'Manager/CategoriesController.update')
  Route.delete('/:id', 'Manager/CategoriesController.delete')
}).prefix('/categories')

export default categoriesRoute
