import Sequelize, { Model } from 'sequelize';

class Order extends Model{
    static init(sequelize) {
        super.init({
            status_purchase: Sequelize.STRING,
            quantity_purchase: Sequelize.INTEGER,
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
        this.belongsTo( models.Product, { foreignKey: 'product_id', as: 'products'})
}
};

export default Order;