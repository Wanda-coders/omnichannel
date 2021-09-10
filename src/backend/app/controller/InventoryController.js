import * as Yup from 'yup'
import Inventory from "../model/Inventory";

class InventoryController {

  async postInventory(req, res) {

    const inventoryExists = await Inventory.findOne({
      where: {
        catalog_id: req.body.catalog_id,
        // quantity: {$gt: 0} 
      }
    })
    const { quantity } = req.body
    if (quantity <= 0) {
      return res.status(401).json({
        message: "Quantity must be bigger than zero!"
      })
    }
    if (inventoryExists) {
      return res.status(401).json({
        message: "Inventory already exists!"
      })
    }
    const {
      id,
      catalog_id,
      store_id,
    } = await Inventory.create(req.body)

    return res.json({
      id,
      quantity,
      catalog_id,
      store_id,
    });

  };
  async getAllInventory(req, res) {

    const isInventory = await Inventory.findAll()
    return res.status(200).json(isInventory);
  }

  async getInventoryById(req, res) {
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