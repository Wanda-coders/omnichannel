
import Order from "../model/Order";
import Product from "../model/Product";
import CatalogController from "./CatalogController";

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

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

    function getCategories(product_list) {
      const promises = product_list.map(
        async function (element) {
          const result2 = await CatalogController.getCatalogById_standalone(element.id).then(function(res) {
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