// Importa os arquivos da pasta controller e define os tipos de rota

import { Router } from 'express';
import AuthController from './app/controller/AuthController';

import UserController from './app/controller/UserController';
import authMiddleware from './app/middlewares/auth';

import StoreController from './app/controller/StoreController';
import CatalogController from './app/controller/CatalogController';
import InventoryController from './app/controller/InventoryController';

const routes = new Router();
// users
routes.post('/user', UserController.postClient);
routes.get('/user', UserController.getAllClients);
routes.get('/user/:id', UserController.getById);
routes.put('/user', UserController.updateById);

routes.post('/auth', AuthController.store);

// routes.use(authMiddleware)
// routes.get('/auth', UserController.index);
// store
routes.post('/store', StoreController.postStore);
routes.get('/store', StoreController.getAllStores);
routes.get('/store/:id', StoreController.getStoreById)

// catalogo
routes.post('/catalog', CatalogController.postCatalog);
routes.get('/catalog', CatalogController.getAllCatalog);
routes.get('/catalog/:id', CatalogController.getCatalogById);


// pedido

routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
routes.delete('/store/:id', UserController.getById);

// estoque
routes.post('/inventory', InventoryController.postInventory);
routes.get('/inventory', InventoryController.getAllInventory);
routes.get('/inventory/:id', InventoryController.getInventoryById);

// fotos
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);

// catálogo
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);

routes.post('/store', StoreController.postStore);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
// produto
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
routes.delete('/store/:id', UserController.getById);
routes.put('/store/:id', UserController.getById);
// pedido
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
routes.delete('/store/:id', UserController.getById);
// estoque
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
// fotos
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);
// catálogo
routes.post('/store', UserController.postClient);
routes.get('/store', UserController.getAllClients);
routes.get('/store/:id', UserController.getById);

export default routes;