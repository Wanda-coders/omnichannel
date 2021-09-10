import * as Yup from 'yup'
import User from "../model/User";

class UserController {

  async postClient(req, res) {

    const userExists = await User.findOne({
      where: {
        cpf: req.body.cpf
      }
    })

    if (userExists) {
      return res.status(401).json({
        message: "Usuario já existe em nossa base de dados"
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
      return res.status(400).json({
        message: "User already exists!"
      })
    }
    return res.status(200).json(isClientId);
  }

  async updateById(req, res){

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      contact: Yup.string(),
      postal_code: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      district: Yup.string(),
      number_house: Yup.string(),
      street: Yup.string(),
      complement: Yup.string(), 
      // password: Yup.string().when('oldPassword',
      //   (oldPassword, field) => oldPassword ? field.required().min(6) : field
      // ),
      // confirmPassword: Yup.string().when('password',
      //   (password, field) => password ? field.required().min(6).oneOf([Yup.ref('password')]) : field
      // ),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(401).json({ 
        message: 'Falha na validação'
      })
    }

    // console.log(req.userEmail)

    const { email, oldPassword } = req.body;

    const {id} = req.query
    console.log(id)

    const user = await User.findByPk(id)
    console.log(email)
    console.log(user)

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
  };


}

export default new UserController();