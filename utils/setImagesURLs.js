import { ref } from "firebase/storage";
import { storage } from "../firebase/config";
import getImgDownloadURL from "./getImgDownloadURL";

export async function setImagesURLs(path){
        if (path) {
          try{
            const imageRef = ref(storage,path)
            const imageURL = await getImgDownloadURL(imageRef)
            return imageURL
          } catch(e){
            console.log(e)
            return null
          }
        }
        return null

}