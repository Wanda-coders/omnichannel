import Product from "../model/Product";

class ProductController {

  async postProduct(req, res) {

    const { quantity, catalog_id } = req.body

    if (quantity > 1) {
      return res.status(401).json({
        message: "Quantity must be bigger than zero!"
      })
    }
        
    const {
      id,
      store_id,
      price,
      inventory_id,
     
    } = await Product.create(req.body)

    return res.json({
        id,
        catalog_id,
        store_id,
        price,
        inventory_id,
        catalog_id,
       
    });

  };
  async getAllProduct(req, res) {

    const isProduct = await Product.findAll()
    return res.status(200).json(isProduct);
  }

  async getProductById(req, res) {
    const { id } = req.params;

    const isProductId = await Product.findOne({
      where: {
        id,
      },
    })
    if (!isProductId) {
      return res.status(400).json({
        message: "Inventory already exists!"
      })
    }
    return res.status(200).json(isProductId);
  }

}

export default new ProductController();