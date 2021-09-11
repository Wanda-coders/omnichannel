
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

  async postOrder(req, res) {

    const date = new Date()
    if(req.body.date_purchase < date){
      return res.status(401).json({
        message: "data não pode ser inferior a data atual"
      })
    }

    // TO-DO: regra de negócio de ter apenas um produto de cada categoria
    // TO-DO: calcular o preço final do pedido

    const { date_purchase, user_id, store_id, ...data} = req.body

    const orderCreated = await Order.create({
      date_purchase: date_purchase,
      user_id: user_id,
      store_id: store_id,
      status_purchase: "Recebido",
      delivery_status: false,
      final_price: 0
    })


    return res.json(orderCreated);
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