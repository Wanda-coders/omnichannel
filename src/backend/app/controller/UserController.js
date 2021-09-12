import * as Yup from 'yup'
import User from "../model/User";

class UserController {

  async postClient(req, res) {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Cria um novo usuário' */

        /* #swagger.parameters['user'] = {
           in: 'body',
           description: 'Informações do usuário',
           required: true,
           schema: {
             "name": "Natália Alpino",
             "email": "nathy.alpino1@gmail.com",
             "cpf": "000.000.000-000",
             "password": "pass",
             "birth_date": "2021-09-11",
             "postal_code": "14403-075",
             "state": "SP",
             "contact": "",
             "city": "Franca",
             "district": "Street",
             "number_house": 2390,
             "street": "José Marcelo Leite",
             "complement": "",
             "is_admin": false
             }
    } */

    const userExists = await User.findOne({
      where: {
        cpf: req.body.cpf
      }
    })

    if (userExists) {
      return res.status(409).json({
        message: "User already exists!"
      })
    }
    const {
      id,
      name,
      email,
      ...data } = await User.create(req.body)

    return res.json({
      id,
      name,
      email,
    });

  };
  async getAllClients(req, res) {

    /* 	#swagger.tags = ['User']
        #swagger.description = 'Lista os usuários' */

    const isClient = await User.findAll({
      where: {
        is_admin: false
      },
      attributes: { exclude: ['password', 'cpf', 'birth_date', 'contact', 'postal_code',
      'state', 'city', 'district', 'number_house', 'street', 'complement', 'is_admin',
      'password_hash', 'createdAt', 'updatedAt'] },
    })
    return res.status(200).json(isClient);
  }

  async getById(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Lista um usuário por Id'
    */

    const { id } = req.params;

    const isClientId = await User.findOne({
      where: {
        id,
        is_admin: false
      },
      attributes: { exclude: ['password', 'cpf', 'birth_date', 'contact', 'postal_code',
      'state', 'city', 'district', 'number_house', 'street', 'complement', 'is_admin',
      'password_hash', 'createdAt', 'updatedAt'] },
    })

    if(!isClientId){
      return res.status(404).json({
        message: "User not found!"
      })
    }
    return res.status(200).json(isClientId);
  }

  async updateById(req, res){
    try {
            /*
            #swagger.tags = ['User']
            #swagger.description = 'Atualiza um usuário'

            #swagger.auto = false
            #swagger.path = '/user/{id}'
            #swagger.method = 'put'
            #swagger.produces = ['application/json']
            #swagger.consumes = ['application/json']

            #swagger.parameters['id'] = {
                in: 'path',
                description: 'User ID.',
                required: true,
                type: 'integer'
            }

            #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User data.',
                required: true,
                type: 'string',
                schema: {
                  "name": "Natália Alpino",
                  "email": "nathy.alpino1@gmail.com",
                  "oldPassword": "pass",
                  "cpf": "000.000.000-000",
                  "contact": "",
                  "postal_code": "14403-075",
                  "state": "SP",
                  "city": "Franca",
                  "district": "Street",
                  "number_house": 2390,
                  "street": "José Marcelo Leite",
                  "complement": ""
                }
            }
        */
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email().required(),
        oldPassword: Yup.string().min(6).required(),
        contact: Yup.string(),
        postal_code: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        district: Yup.string(),
        number_house: Yup.string(),
        street: Yup.string(),
        complement: Yup.string()
      })

      await schema.validate(req.body).catch(err => {
        throw res.status(400).json({
          message: err.message
        })
      })

      const { email, oldPassword } = req.body;
      const { id } = req.query
      const user = await User.findByPk(id)

      if(email !== user.email){
        const userExists = await User.findOne({ where: { email }})
        // retorno
        if(userExists){
          return res.status(400).json({ message: 'Verifique o email informado'})
        }
        return res.status(400).json({ message: 'Email não confere'})
      }

      if(oldPassword && !(await user.checkPassword(oldPassword))){
        return res.status(400).json({ message: 'Senha não confere'})
      }

      const { name, contact, district, number_house, street, complement, postal_code} = await user.update(req.body);

      return res.status(200).json({
        id,
        name,
        contact,
        district,
        number_house,
        street,
        complement,
        postal_code
      });
    } catch (err) {
      throw err
    }
  };
}

export default new UserController();