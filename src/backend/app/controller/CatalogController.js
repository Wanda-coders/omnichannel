import * as Yup from 'yup'
import Catalog from "../model/Catalog";

class CatalogController {

  async postCatalog(req, res) {

  /*
    #swagger.tags = ['Catalog']
    #swagger.description = 'Cria um novo produto no catálogo'

    #swagger.parameters['catalog'] = {
        in: 'body',
        description: 'Dados do catálogo',
        required: true,
        type: 'string',
        schema: {
          "name": "Funko",
          "description": "Mulher-Maravilha",
          "unit_value": "75.00",
          "category": "Colecionáveis"
      }
    }
  */

    const catalogExists = await Catalog.findOne({
      where: {
        name: req.body.name
      }
    })

    if (catalogExists) {
      return res.status(409).json({
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

    return res.status(201).json({
      id,
      name,
      description,
      unit_value,
      category,
    });

  };
  async getAllCatalog(req, res) {

  /*
    #swagger.tags = ['Catalog']
    #swagger.description = 'Lista os produtos disponíveis'
  */

    const isCatalog = await Catalog.findAll()
    return res.status(200).json(isCatalog);
  }

  /*ESTÁ REDUNDANTE, PODE SER REMOVIDO? */
  async getCatalogById_standalone(id) {
    const isCatalogId = await Catalog.findOne({
      where: {
        id,
      },
    })
    return isCatalogId
  }

  async getCatalogById(req, res) {

  /*
    #swagger.tags = ['Catalog']
    #swagger.description = 'Lista um produto pelo ID'
  */

    const { id } = req.params;

    const isCatalogId = await Catalog.findOne({
      where: {
        id,
      },
    })
    if(!isCatalogId){
      return res.status(409).json({
        message: "Catalog already exists!"
      })
    }
    return res.status(200).json(isCatalogId);
  }

}

export default new CatalogController();