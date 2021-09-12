
import Order from "../model/Order";
import Product from "../model/Product";
import CatalogController from "./CatalogController";

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}


class OrderController {

  async getOrders(orderUser) {
    const promises = orderUser.map(
      async function (element) {
        const result2 = await this.getOrderById({"params": element}).then(function(res) {
          return res
        });
        return result2
    });
    return Promise.all(promises);
  }
  
  async postOrder(req, res) {

    const date = new Date()
    if(req.body.date_purchase < date){
      return res.status(401).json({
        message: "data não pode ser inferior a data atual"
      })
    }

    const arrQuantity = req.body.product_list.map(element => element.quantity);
    const maxQuantity = Math.max(...arrQuantity);
    if(maxQuantity > 1){
      return res.status(401).json({
        message: "Ops, você só pode comprar uma unidade de cada produto!"
      })
    }

    function getCategories(product_list) {
      const promises = product_list.map(
        async function (element) {
          const result2 = await CatalogController.getCatalogById({"params": element}).then(function(res) {
            return res.category
          });
          return result2
      });
      return Promise.all(promises);
    }
    const categories = await getCategories(req.body.product_list);

    const hasDuplicatedProducts = hasDuplicates(req.body.product_list.map(element => element.id));
    if(hasDuplicatedProducts){
      return res.status(401).json({
        message: "Ops, não pode ter produtos duplicados no carrinho!"
      })
    }

    const hasDuplicatedCategories = hasDuplicates(categories);
    if(hasDuplicatedCategories){
      return res.status(401).json({
        message: "Ops, você só pode comprar um produto para cada categoria!"
      })
    }
    const sumPrices = (accumulator, currentValue) => accumulator + currentValue.price;
    const final_price = req.body.product_list.reduce(sumPrices, 0);

    const { date_purchase, user_id, store_id, ...data} = req.body

    const orderCreated = await Order.create({
      date_purchase: date_purchase,
      user_id: user_id,
      store_id: store_id,
      status_purchase: "Recebido",
      delivery_status: false,
      final_price: final_price
    })

    for (var i = 0; i < req.body.product_list.length; i++){
      const productCreated = await Product.create({
        "order_id": orderCreated.id,
        "catalog_id": req.body.product_list[i].id,
        "price": req.body.product_list[i].price,
        "quantity": req.body.product_list[i].quantity,
      })
    }
    return res.json(orderCreated);
  }

  async getOrderById(req, res) {
  
    const {id: order_id} = req.params

    const isOrder = await Order.findOne({
      where: {
        id: order_id
      },
    })
    console.log(isOrder)
    if (!isOrder) {
      return res.status(404).json({
        message: "Order not found!"
      })
    }

    const product_list = await Product.findAll({
      where: {
        order_id: order_id
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'order_id'] },
    })

    const returnObject = {
      order_id: order_id,
      user_id: isOrder.user_id,
      store_id: isOrder.store_id,
      status_purchase: isOrder.status_purchase,
      date_purchase: isOrder.date_purchase,
      delivery_status: isOrder.delivery_status,
      final_price: isOrder.final_price,
      product_list: product_list,
    }

    if (res === undefined) {
      return returnObject
    }
    return res.status(200).json(returnObject);
  }
  
  async getAllByIdCliente(req, res) {

    const {id: userId} = req.params

    const orderUser = await Order.findAll({  
      where: {
        user_id: userId
      }
    })
    console.log(orderUser)
    console.log(this)

    // let order_list = [];
    // for (var i = 0; i < orderUser.length; i++){
    //     console.log(this)
    //     console.log(OrderController)
    //     this_order = await OrderController.getOrderById({"params": {"id": orderUser[i].id}}).then(function(res) {
    //     return res
    //   });
    //   order_list.push(this_order)
    // }
    const order_list = await this.getOrders(orderUser);

    if (res === undefined) {
      return order_list
    }
    return res.status(200).json(order_list);
  };

}

export default new OrderController();