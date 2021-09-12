import Photo from '../model/Photo';
import Product from '../model/Product';

class PhotosControllers {

    async store(req, res) {
        /*
        #swagger.tags = ['Photos']
        #swagger.description = 'Salva uma novo foto'

        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['photo'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Insira a foto...',
        } */

        const { originalname: image_name, filename: path } = req.file;

        const { id, url } = await Photo.create({
            image_name,
            path,
        })

        const sendImage = await Product.findOne({
            where: {
                id
            }
        })

        sendImage.update({ photo_id: id })

        return res.json({
            image_name,
            url,
            path
        })
    }
}

export default new PhotosControllers();