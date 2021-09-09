// Importa os arquivos da pasta controller e define os tipos de rota

import { Router } from 'express';
import AuthController from './app/controller/AuthController';

import UserController from './app/controller/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/auth', AuthController.store);

// routes.use(authMiddleware)
// routes.get('/auth', UserController.index);


export default routes;