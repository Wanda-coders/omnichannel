import Sequelize, { Model } from 'sequelize';

class Order extends Model{
    static init(sequelize) {
        super.init({
            status_purchase: Sequelize.STRING,
            date_purchase: Sequelize.DATE,
            delivery_status: Sequelize.BOOLEAN, 
            final_price: Sequelize.DECIMAL,
        },
        {
            sequelize,
            });
        return this;
    }
    static associate(models){
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'users'})
        this.belongsTo( models.Store, { foreignKey: 'store_id', as: 'stores'})
}
};

export default Order;