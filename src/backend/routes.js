// Importa os arquivos da pasta controller e define os tipos de rota

import { Router } from 'express';

import UserController from './app/controller/UserController';

const routes = new Router();

routes.get('/', UserController.getByIndex);

export default routes;