import Photo from '../model/Photo';
import Product from '../model/Product';

class PhotosControllers {
    async store(req, res) {
        const { originalname: image_name, filename: path } = req.file;

        const { id, url } = await Photo.create({
            image_name,
            path,
           
        })

        const sendImage = await Product.findOne(
            {
              where: { id: req.id }
            }
          )

        sendImage.update({ photo_id: id })

        return res.json({
            image_name,
            path,
        })
    }
}

export default new PhotosControllers();