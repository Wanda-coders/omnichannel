// Importa os arquivos da pasta controller e define os tipos de rota

import { Router } from 'express';
import AuthController from './app/controller/AuthController';

import UserController from './app/controller/UserController';
import authMiddleware from './app/middlewares/auth';

import StoreController from './app/controller/StoreController';

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
routes.post('/store', UserController.postClient);
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