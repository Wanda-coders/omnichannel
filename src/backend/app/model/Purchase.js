import Sequelize, { Model } from 'sequelize';

class Purchase extends Model{
    static init(sequelize) {
        super.init({
            status_purchase: Sequelize.ENUM(3),
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
        this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'})
        this.belongsTo( models.Store, { foreignKey: 'store_id', as: 'store'})
}
};

export default Purchase;