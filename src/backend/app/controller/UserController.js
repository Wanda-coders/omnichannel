import * as Yup from 'yup';
import User from "../model/User";

class UserController {

  async store(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   email: Yup.string().email().required(),
    //   password: Yup.string().required().min(6),
    //   cpf: Yup.string().required().min(11),
    //   birth_date: Yup.date().required(),
    //   contact: Yup.string().required(),
    //   postal_code: Yup.string().required(),
    //   state: Yup.array().min(27),
    //   city: Yup.string().required(),
    //   district: Yup.string().required(),
    //   number_house: Yup.string().required(),
    //   street: Yup.string().required(),
    //   complement: Yup.string().required()
    // });

    //buscar do body para saber se tem algum problema

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(401).json({
    //     message: "Dados inválidos"
    //   });
    // }

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
      cpf,
      birth_date,
      contact,
      postal_code,
      state,
      city,
      district,
      number_house,
      street,
      complement } = await User.create(req.body)
      	
    return res.json({
      id,
      name,
      email,
      cpf,
      birth_date,
      contact,
      postal_code,
      state,
      city,
      district,
      number_house,
      street,
      complement
    });

  };
  async index(req, res) {
    const person = [{
      name: "Marciel",
      age: 21
    },
    {
      name: "Renata",
      age: 21
    }]
    return res.status(200).json(person);
  }
}

export default new UserController();