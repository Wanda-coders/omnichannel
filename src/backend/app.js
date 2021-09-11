// Arquivo que conterá a classe App e importações do projeto

import express from 'express';
import cors from 'cors'
import path from 'path';
import routes from './routes';

import './database'

class App {
  constructor() {
    this.server = express();
    this.cors = cors()
    this.middleware();   
    this.routes();
  
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use('/store', express.static(path.resolve(__dirname, '..','..', '..', 'tmp', 'uploads')))   
  }

  routes() {
    this.server.use(routes);
    
  }
}

export default new App().server;