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
      return res.status(409).json({
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

  /*
    #swagger.tags = ['Inventory']
    #swagger.description = 'Consulta dados de estoque'

    #swagger.parameters['catalog_id'] = {
        in: 'query',
        description: 'Catalog_id para filtrar dados de estoque',
        required: false,
        type: 'integer',
    }

    #swagger.parameters['store_id'] = {
        in: 'query',
        description: 'Store_id para filtrar dados de estoque',
        required: false,
        type: 'integer',
    }
  */

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

  async getInventoryTotal(req, res) {

  /*
    #swagger.tags = ['Inventory']
    #swagger.description = 'Lista o estoque total de um certo produto'
  */

    const { id: catalog_id } = req.params;
    const inventoryResults = await Inventory.findAll({
      where: {
        catalog_id: catalog_id,
      },
    })
    if (!inventoryResults) {
      return res.status(404).json({
        message: "Inventory not found!"
      })
    }
    const quantity = inventoryResults.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0,
    );
    const returnObject = {
      id: catalog_id,
      amount: quantity,
    }
    return res.status(200).json(returnObject);

  }

}

export default new InventoryController();