import * as Yup from 'yup'
import Inventory from "../model/Inventory";

class InventoryController {

  async postInventory(req, res) {

  /*
    #swagger.tags = ['Inventory']
    #swagger.description = 'Adciona um produto no estoque'

    #swagger.parameters['inventory'] = {
        in: 'body',
        description: 'Dados do inventário/estoque',
        required: true,
        type: 'string',
        schema: {
          "quantity": 10,
          "catalog_id": 2,
          "store_id": 1,
      }
    }
  */

    const inventoryExists = await Inventory.findOne({
      where: {
        catalog_id: req.body.catalog_id,
      }
    })

    if (inventoryExists) {
      return res.status(409).json({
        message: "Inventory already exists!"
      })
    }

    const { quantity } = req.body

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be bigger than zero!"
      })
    }

    const { id, catalog_id, store_id } = await Inventory.create(req.body)

    return res.json({
      id,
      quantity,
      catalog_id,
      store_id,
    });

  };
  async getAllInventory(req, res) {

  /*
    #swagger.tags = ['Inventory']
    #swagger.description = 'Lista os produtos do estoque'
  */

    const isInventory = await Inventory.findAll()
    return res.status(200).json(isInventory);
  }

  async getInventoryById(req, res) {

  /*
    #swagger.tags = ['Inventory']
    #swagger.description = 'Lista um produto do estoque pelo ID'
  */

    const { id } = req.params;

    const isInventoryId = await Inventory.findOne({
      where: {
        id,
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

export default new InventoryController();