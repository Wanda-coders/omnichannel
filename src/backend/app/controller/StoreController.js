import Store from '../model/Store'

class StoreController{
  async postStore(req, res) {

  /*
    #swagger.tags = ['Store']
    #swagger.description = 'Cria uma nova loja'
  */

  /* #swagger.parameters['Store'] = {
      in: 'body',
      description: 'Informações da Loja',
      required: true,
      schema: {
          "name": "Loja São Joaquim",
          "contact": "(11)1111-1111",
          "postal_code": "14402-000",
          "state": "SP",
          "city": "Franca",
          "district": "São Joaquim",
          "address": "Rua São Jose",
          "number": "1010",
          "complement": ""
      }
    }
  */

    const storeExists = await Store.findOne({
       where: {
         name: req.body.name
        }
      });

    if(storeExists){
      return res.status(409).json('Loja já cadastrada');
    };

    const { id, name, contact, postal_code, state, city, district, address, number, complement } = await Store.create(req.body);
    return res.status(201).json({id, name, contact, postal_code, state, city, district, address, number, complement});
  };

  async getAllStores(req, res){

  /*
    #swagger.tags = ['Store']
    #swagger.description = 'Lista as lojas físicas'
  */

   const isStore = await Store.findAll()
   return res.status(200).json(isStore);
  };



  async getStoreById(req, res) {

  /*
    #swagger.tags = ['Store']
    #swagger.description = 'Lista uma loja pelo ID'
  */

    const { id } = req.params;

    const isStoreId = await Store.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })

    if(!isStoreId){
      return res.status(404).json({
        message: "Store doesn't exists!"
      })
    }
    return res.status(200).json(isStoreId);
  }
}

export default new StoreController();
