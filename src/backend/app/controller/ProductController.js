import Product from "../model/Product";

class ProductController {

  async postProduct(req, res) {

    /*
    #swagger.tags = ['Product']
    #swagger.description = 'Cria um novo produto'

    #swagger.parameters['product'] = {
        in: 'body',
        description: 'Informações do producto',
        required: true,
        schema: {
          "catalog_id": 1,
          "store_id": 1,
          "price": 10.00,
          "inventory_id": 1,
          "quantity": 5
        }
    }
  */

    const { quantity, catalog_id } = req.body

    if (quantity === 0) {
      return res.status(400).json({
        message: "Quantity must be bigger than zero!"
      })
    }

    const { id, store_id, price, inventory_id } = await Product.create(req.body)

    return res.status(201).json({
      id,
      catalog_id,
      store_id,
      price,
      inventory_id,
      catalog_id,

    });
  };

  async getAllProduct(req, res) {

    /*
      #swagger.tags = ['Product']
      #swagger.description = 'Lista todos os produtos'
    */

    const isProduct = await Product.findAll()
    return res.status(200).json(isProduct);
  }

  async getProductById(req, res) {

    /*
      #swagger.tags = ['Product']
      #swagger.description = 'Lista todos os produtos'
    */

    const { id } = req.params;

    const isProductId = await Product.findOne({
      where: {
        id,
      },
    })
    if (!isProductId) {
      return res.status(404).json({
        message: "Product not fond"
      })
    }
    return res.status(200).json(isProductId);
  }

}

export default new ProductController();