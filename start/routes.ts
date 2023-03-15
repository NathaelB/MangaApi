/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import accountsRoute from './routes/accounts'
import productsRoute from './routes/products'
import ordersRoute from './routes/orders'
import categoriesRoute from './routes/categories'

Route.group(() => {
  Route.group(() => {

    Route.group(() => {
      Route.group(() => {}).middleware('guest')
      Route.group(() => {}).middleware('auth')
    }).prefix('/authentication')

    Route.group(() => {
      accountsRoute()
      productsRoute()
      ordersRoute()
      categoriesRoute()

    }).middleware('auth').prefix('/manager')
  }).prefix('/v1')
}).prefix('/api')
