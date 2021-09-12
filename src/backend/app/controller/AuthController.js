import jwt from 'jsonwebtoken';
import User from '../model/User';
import authConfig from '../../config/auth';

class AuthController {

    async store(req, res) {
    /*
        #swagger.tags = ['Authentication']
        #swagger.description = 'Autentica o usuário'

        #swagger.parameters['auth'] = {
            in: 'body',
            description: 'Informações de autenticação',
            required: true,
            schema: {
                "email": "nathy.alpino1@gmail.com",
                "password": "pass"
            }
        }
    */
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: 'O usuário não está cadastrado!' })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }
        const { id, name } = user;

        return res.status(201).json({
            user: {
                id,
                email,
                name
            },
            token: jwt.sign({
                id,
                name,
                email
            }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })
    }
}

export default new AuthController();