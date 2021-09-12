import * as Yup from 'yup'
import Catalog from "../model/Catalog";

class CatalogController {

  async postCatalog(req, res) {

    const catalogExists = await Catalog.findOne({
      where: {
        name: req.body.name
      }
    })

    if (catalogExists) {
      return res.status(401).json({
        message: "Catalog already exists!"
      })
    }
    const {
      id,
      name,
      description,
      unit_value,
      category,
    } = await Catalog.create(req.body)

    return res.json({
      id,
      name,
      description,
      unit_value,
      category,
    });

  };

  async getAllCatalog(req, res) {

    const isCatalog = await Catalog.findAll()
    return res.status(200).json(isCatalog);
  };

  async getCatalogById_standalone(id) {
    const isCatalogId = await Catalog.findOne({
      where: {
        id,
      },
    })
    return isCatalogId
  };

  async getCatalogById(req, res) {
    const { id } = req.params;

    const isCatalogId = await Catalog.findOne({
      where: {
        id,
      },
    })
    if(!isCatalogId){
      return res.status(400).json({
        message: "No Product found with this id!"
      })
    }
    return res.status(200).json(isCatalogId);
  };

}

export default new CatalogController();