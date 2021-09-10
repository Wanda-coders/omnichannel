import * as Yup from 'yup';
import Store from '../model/Store'

class StoreController{
  async postStore(req, res) {

    const storeExists = await Store.findOne({
       where: { 
         name: req.body.name 
        }
      });

    if(storeExists){
      return res.status(401).json({ message: 'Loja já cadastrada em nossa base' })
    };

    const { id, name, contact, postal_code, state, city, district, address, number, complement } = await Store.create(req.body);
    return res.json({id, name, contact, postal_code, state, city, district, address, number, complement});
  };

  async getAllStores(req, res){
   const isStore = await Store.findAll()
   return res.status(200).json(isStore);
  };
  async getStoreById(req, res) {
    const { id } = req.params;

    const isStoreId = await Store.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    if(!isStoreId){
      return res.status(400).json({
        message: "Loja não cadastrada!"
      })
    }
    return res.status(200).json(isStoreId);
  }
}

export default new StoreController();
