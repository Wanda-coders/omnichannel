import Photo from '../model/Photo';
import Catalog from '../model/Catalog';

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
        const { catalog_id } = req.query;

        if (catalog_id === undefined) {
            return res.status(400).json({
                message: "You must select a catalog_id!"
            })
        }
        const isCatalogId = await Catalog.findOne({
            where: {
                id: catalog_id,
            },
        })
        if (!isCatalogId) {
            return res.status(400).json({
                message: "No Product found with this id!"
            })
        }

        const { id, url } = await Photo.create({
            image_name,
            path,
            catalog_id,
        })

        return res.json({
            id,
            url,
            image_name,
            path,
            catalog_id,
        })
    }

    async getAllPhotos(req, res) {
        const isPhoto = await Photo.findAll()
        return res.status(200).json(isPhoto);
    };
}

export default new PhotosControllers();