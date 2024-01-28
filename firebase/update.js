import {
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { uploadImg } from "../utils/uploadImg";
import { db, storage } from "./config";

const bannerRef = doc(db, "info", "banners");
const colorRef = doc(db, 'info','colors')
const medicalCategoryRef = doc(db, "info", "pages");
const testimonialsRef = doc(db,'info','testimonials')
const newsRef = doc(db, "info", "news");

export const updateColors = async (data) => {
  try{
    await updateDoc(colorRef,{
      ...data
    })
  }catch(e){
    throw new Error(e)
  }
}

export const updateBanners = async (id, data) => {
  await uploadImg(data.img, data.imgFile);
  await uploadImg(data.imgphone, data.imgphoneFile);

  try {
    await updateDoc(bannerRef, {
      [id]: {
        id: id,
        img: data.img,
        imgphone: data.imgphone,
        calltoaction: data.calltoaction,
        subtitle: data.subtitle,
        description: data.description,
        title: data.title,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

//No es la mejor implementación. updateMedicalCategory y createMedicalCategory
//hacen escencialmente lo mismo. Revisar a futuro de ser necesario
export const updateMedicalCategory = async (data) => {
  await uploadImg(data.img, data.imgFile);
  await uploadImg(data.portrait, data.portraitFile);
  await uploadImg(data.portraitphone, data.portraitphoneFile)

  try {
    await updateDoc(medicalCategoryRef, {
      [data.id]: {
        id: data.id,
        title: data.title,
        img: data.img,
        portrait: data.portrait,
        portraitphone: data.portraitphone,
        order: data.order
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const updateTestimony = async ({id,link,portraitFile,portraitPath}) => {
  await uploadImg(portraitPath, portraitFile)
  //En el caso de los testimonios, lo único editable serán las imágenes
  try{
    await updateDoc(testimonialsRef,{
      [id]: {
        id,
        link,
        portrait: portraitPath,
        uploadedAt: Timestamp.fromDate(new Date())
      }
    })
  } catch (e){
    throw new Error(e)
  }
}

export const updateNews = async (data) => {
  await uploadImg(data.img, data.imgFile);

  try {
    await updateDoc(newsRef, {
      [data.id]: {
        id: data.id,
        title: data.title,
        img: data.img,
        link: data.link,
        uploadedAt: Timestamp.fromDate(new Date()),
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const updateCategories = async (data, catalog, department) => {
  const categoriesRef = doc(db, catalog, "categories");
  try {
    if (department) {
      await updateDoc(categoriesRef, {
        department: data,
      });
    } else {
      await updateDoc(categoriesRef, {
        categories: data,
      });
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const updateSubcategory = async (data, catalog, subcategories) => {
  const categoriesRef = doc(db, catalog, "categories");
  const editedSubcategories = subcategories.map((item) => {
    if (item.id === data.id) {
      return {
        category: data.category,
        title: data.title,
        id: data.id,
        img: data.img,
      };
    }
    return item;
  });
  await uploadImg(data.img, data.imgFile);

  try {
    await updateDoc(categoriesRef, {
      subcategory: editedSubcategories,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const updateProduct = async (
  data,
  datasheetFile,
  secondarydatasheetFile,
  imagesFile,
  catalog
) => {

  //Con respecto a images:
  //  Si NO se ha borrado o CAMBIADO la imagen, aparecerá por defecto el valor proveniente del array productImages
  //  Por el lado contrario, si se quiere subir una nueva imagen, el array de images indicará cuales se quedarán sin modificar (aquella con el objeto con la propiedad path)
  //  y cuales serán un objeto tipo File para ser subidos
  //  Al editar el producto, se subirá un array de images completamente nuevo reemplazando el viejo, aún así no se haya modificado nada
  const productRef = doc(db, catalog, data.id);
  let images = [];
  try {
    //En realidad uploadImg se usa para subir archivos en general a firebase
    await uploadImg(data.datasheet, datasheetFile);
    await uploadImg(data.secondarydatasheet, secondarydatasheetFile);
    for (const img of imagesFile) {
      if (img instanceof FileList) {
        const imgPath = `products/${img[0].name}`;
        images.push(imgPath);
        await uploadImg(imgPath, img[0]);
      } else {
        images.push(img.path);
      }
      await updateDoc(productRef, {
        ...data,
        images
      })
    }
  } catch (e) {
    throw new Error(e);
  }
};
