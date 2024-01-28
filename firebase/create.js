import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { uploadImg } from "../utils/uploadImg";
import { db } from "./config";

const medicalCategoryRef = doc(db, "info", "pages");
const testimonialsRef = doc(db, "info", "testimonials");
const brandRef = doc(db, "info", "brand");
//No es la mejor implementación. updateMedicalCategory y createMedicalCategory
//hacen escencialmente lo mismo. Revisar a futuro de ser necesario
export const createMedicalCategory = async (data) => {
  try {
    await uploadImg(data.img, data.imgFile);
    await uploadImg(data.portrait, data.portraitFile);

    await updateDoc(medicalCategoryRef, {
      [data.id]: {
        id: data.id,
        title: data.title,
        img: data.img,
        portrait: data.portrait,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};
export const createBrand = async (data) => {
  try {
    await uploadImg(data.img, data.imgFile);
    await updateDoc(brandRef, {
      [data.id]: {
        id: data.id,
        title: data.title,
        img: data.img,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const createTestimony = async ({ id, link, portrait, portraitFile }) => {
  try {
    await uploadImg(portrait, portraitFile);
    await updateDoc(testimonialsRef, {
      [id]: {
        id,
        link,
        portrait,
        uploadedAt: Timestamp.fromDate(new Date())
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const createProductCategory = async (data, catalog, department) => {
  const categoriesRef = doc(db, catalog, "categories");
  try {
    if (department) {
      await updateDoc(categoriesRef, {
        department: arrayUnion(data),
      });
    } else {
      await updateDoc(categoriesRef, {
        categories: arrayUnion(data),
      });
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const createSubcategory = async (data, catalog, imgFile) => {
  const categoriesRef = doc(db, catalog, "categories");
  try {
    await uploadImg(data.img, imgFile);
    await updateDoc(categoriesRef, {
      subcategory: arrayUnion(data),
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const addProduct = async (
  data,
  datasheetFile,
  secondarydatasheetFile,
  imagesFile,
  catalog
) => {
  const catalogRef = collection(db, catalog);
  let images = [];
  try {
    //En realidad uploadImg se usa para subir archivos en general a firebase
    await uploadImg(data.datasheet, datasheetFile);
    await uploadImg(data.secondarydatasheet, secondarydatasheetFile);
    for (const img of imagesFile) {
      const imgPath = `products/${img[0].name}`;
      images.push(imgPath);
      await uploadImg(imgPath, img[0]);
    }
    const docRef = await addDoc(catalogRef, {
      ...data,
      images,
    });
    const productRef = doc(db, catalog, docRef.id);
    await updateDoc(productRef, {
      id: docRef.id,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
