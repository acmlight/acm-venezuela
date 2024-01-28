import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";

export const deleteImage = async (path) => {

    const imageRef = ref(storage,path )
    try{
        await deleteObject(imageRef)
    }catch(e){
        throw new Error(e)
    }
}