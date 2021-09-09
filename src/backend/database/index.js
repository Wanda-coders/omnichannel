import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/model/User';
import databaseConfig from './../config/database';

const models = [User]

class Database{
    constructor(){
        this.init();
        // this.mongo()
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))

    }
    // mongo(){
    //    this.mongoConnection = mongoose.connect(
    //       'mongodb+srv://luizalabs:DvZlesHrbUqE5boD@luizacoders.sm1sy.mongodb.net/Notifications?retryWrites=true&w=majority', 
    //       { useNewUrlParser: true, useUnifiedTopology: true }
    //     )
    //   }
}

export default new Database();