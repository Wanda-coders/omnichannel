import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      cpf:  Sequelize.STRING,
      name: Sequelize.STRING,
      birth_date: Sequelize.DATE,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      contact: Sequelize.STRING,
      postal_code: Sequelize.STRING,
      state: Sequelize.ENUM,
      city: Sequelize.STRING,
      district: Sequelize.STRING,
      number_house: Sequelize.STRING,
      street: Sequelize.STRING,
      complement: Sequelize.STRING
    }, 
    {  
      sequelize, 
    });
    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })
    return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User;