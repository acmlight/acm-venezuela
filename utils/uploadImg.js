import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImg = async (path,img) => {
    try{
        if(img){
            const imgRef = ref(storage, path)
            await uploadBytes(imgRef,img)
        }
    }catch(e){
        console.log(e)
    }
}