import * as Yup from 'yup'
import Inventory from "../model/Inventory";

class InventoryController {

  async postInventory(req, res) {

    const { quantity } = req.body
    if (quantity < 0) {
      return res.status(401).json({
        message: "Quantity cannot be negative!"
      })
    }
    const inventoryExists = await Inventory.findOne({
      where: {
        catalog_id: req.body.catalog_id,
        store_id: req.body.store_id
      }
    })
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

  async getInventory(req, res) {
    const { catalog_id, store_id } = req.query;
    let inventoryResults;
    if ((catalog_id !== undefined) & (store_id !== undefined)) {
      inventoryResults = await Inventory.findAll({
        where: {
          catalog_id: catalog_id,
          store_id: store_id
        },
      })
    }
    else if (catalog_id !== undefined) {
      inventoryResults = await Inventory.findAll({
        where: {
          catalog_id: catalog_id,
        },
      })
    }
    else if (store_id !== undefined) {
      inventoryResults = await Inventory.findAll({
        where: {
          store_id: store_id,
        },
      })
    }
    else {
      inventoryResults = await Inventory.findAll()
    }
    inventoryResults = inventoryResults.filter((element) => element.quantity > 0)
    if (!inventoryResults) {
      return res.status(404).json({
        message: "Inventory not found!"
      })
    }
    return res.status(200).json(inventoryResults);
  };
}

export default new InventoryController();