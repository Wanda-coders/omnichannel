
import Order from "../model/Order";

class OrderController {

  async getAllByIdCliente(req, res) {

    const {id} = req.params

    const orderUser = await Order.findAll({  
      where: {
       id: req.body.user_id
      }
    })
    return res.status(200).json(orderUser);
  }

  async postPurchase(req, res) {
    
    const { product_id, quantity_purchase, delivery_status, date_purchase, status_purchase } = req.body

    if (quantity_purchase > 1) {
      return res.status(401).json({
        message: "O limite no carrinho é um pedido"
      })
    }

    if (status_purchase === "RECUSADO") {
      return res.status(401).json({
        message: "Pedido não autorizado"
      })
    }
    const date = new Date()
    if(date_purchase < date){
      return res.status(401).json({
        message: "data não pode ser inferior a data atual"
      })
    }
    const productExists = await Order.findOne({
      where: {
        product_id: req.body.product_id,   
        user_id: req.body.user_id
      }
    })

    if(productExists){
      return res.status(400).json({
        message: "Não pode ser o mesmo produto"
      })
    }
    const {
      id,
      store_id,
      final_price,
      user_id,
      product_id
    } = await Order.create(req.body)

    return res.json({
      id,
      store_id,
      status_purchase,
      quantity_purchase,
      date_purchase,
      delivery_status,
      final_price,
      user_id,
      product_id
    });
  };

  async updateOrderStatus(req, res) {
    const { id, status_purchase, delivery_status } = req.body;
    const getOrder = await Order.findOne({
      where: { id }
    })

    if(!getOrder) {
      return res.status(400).json({ message: 'Order not found' });
    }

    const updateOrder = await Order.update({
      where: { id, status_purchase: 'APROVADO' },
    });

    return res.status(200).json(updateOrder);
  };

  async getOrderById(req, res) {
  
    const {user_id} = req.body

    const isInventoryId = await Order.findAll({
      where: {
        user_id: req.body.user_id
      },
    })
    if (!isInventoryId) {
      return res.status(400).json({
        message: "Inventory already exists!"
      })
    }
    return res.status(200).json(isInventoryId);
  }

}

export default new OrderController();