// Arquivo que conterá a classe App e importações do projeto

import express from 'express';

import routes from './routes';

import './database'

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;