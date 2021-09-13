import Catalog from "../model/Catalog";
import Photo from "../model/Photo";

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
      name,
      description,
      unit_value,
      category,
    } = await Catalog.create(req.body)

    return res.status(201).json({
     
      name,
      description,
      unit_value,
      category,
    });

  };

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
        return res.status(404).json({
          message: "No Product found with this id!"
        })
      }

      const isPhoto = await Photo.findOne({
        where: {
          catalog_id: id,
        }
      })
      if (isPhoto) {
        var image = isPhoto.url;
      }

      const returnObject = {
        ...isCatalogId.dataValues,
        image: image,
      }

      if (res === undefined) {
        return returnObject
      }
      return res.status(200).json(returnObject);
    };

  async getAllCatalog(req, res) {

  /*
    #swagger.tags = ['Catalog']
    #swagger.description = 'Lista os produtos disponíveis'
  */

    const isCatalog = await Catalog.findAll()

    var thisClass = this;
    function getEachCatalog(catalogList) {
      const promises = catalogList.map(
        async function (element) {
          const result2 = await thisClass.getCatalogById({"params": element}).then(function(res) {
            return res
          });
          return result2
      });
      return Promise.all(promises);
    }
    const catalog_list = await getEachCatalog(isCatalog);
    return res.status(200).json(catalog_list);

  };



}

export default new CatalogController();