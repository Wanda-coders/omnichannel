import Sequelize, { Model } from 'sequelize';

class Purchase extends Model{
    static init(sequelize) {
        super.init({
            status_purchase: Sequelize.ENUM,
            quantity_purchase: Sequelize.INTEGER,
            data_purchase: Sequelize.DATE,
            delivery_status: Sequelize.BOOLEAN,
            delivery_store: Sequelize.BOOLEAN,
            final_price: Sequelize.DECIMAL,
        },
        {
            sequelize,
        });
    }
}

export default Purchase;