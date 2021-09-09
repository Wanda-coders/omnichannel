import User from "../model/User";

class UserController {

  async store(req, res) {

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