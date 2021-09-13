// Importa os arquivos da pasta controller e define os tipos de rota

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AuthController from './app/controller/AuthController';
import UserController from './app/controller/UserController';
import authMiddleware from './app/middlewares/auth';
import StoreController from './app/controller/StoreController';
import CatalogController from './app/controller/CatalogController';
import InventoryController from './app/controller/InventoryController';
import PhotosController from './app/controller/PhotosController';
import OrderController from './app/controller/OrderController';

const routes = new Router();
const upload = multer(multerConfig)

// users
routes.post('/user', UserController.postClient);
routes.get('/user', UserController.getAllClients);
routes.get('/user/:id', UserController.getById);
routes.put('/user', UserController.updateById);

// auth
routes.post('/auth', AuthController.store);
// routes.use(authMiddleware)
// routes.get('/auth', UserController.index);

// store
routes.post('/store', StoreController.postStore);
routes.get('/store', StoreController.getAllStores);
routes.get('/store/:id', StoreController.getStoreById)

// catalogo
routes.post('/catalog', CatalogController.postCatalog);
routes.get('/catalog', CatalogController.getAllCatalog.bind(CatalogController));
routes.get('/catalog/:id', CatalogController.getCatalogById);

// estoque
routes.post('/inventory', InventoryController.postInventory);
routes.get('/inventory', InventoryController.getInventory);

// fotos
routes.post('/photos', upload.single('photo'), PhotosController.store);

// pedido
routes.post('/order', OrderController.postOrder);
routes.get('/order/:id', OrderController.getOrderById);
routes.get('/orderByClient/:id', OrderController.getAllByIdCliente.bind(OrderController));

export default routes;