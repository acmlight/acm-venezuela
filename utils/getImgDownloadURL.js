import { getDownloadURL } from "firebase/storage";


const getImgDownloadURL = async ( imgRef ) => {

    try {
        const url = await getDownloadURL(imgRef)
        return url
    }
    catch (error) {

        console.log(error)
        switch (error.code) {
            case 'storage/object-not-found':
                throw new Error('Imagen no encontrada')
            case 'storage/unauthorized':
                throw new Error('No autorizado')
            case 'storage/canceled':
                throw new Error('Operación cancelada')
            case 'storage/unknown':
                throw new Error('Error desconocido')
            default:
                throw error;
        }
    }
}

export default getImgDownloadURL;