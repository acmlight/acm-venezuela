import {
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";
import { setImagesURLs } from "../utils/setImagesURLs";
import findAttribute from "../utils/findAttribute";
//import arrangeMenu from "../helpers/arrangeMenu";

const infoRef = doc(db, "info", "banners");
const colorsRef = doc(db, "info", "colors");
const pagesRef = doc(db, "info", "pages");
const newsRef = doc(db, "info", "news");
const testimonialsRef = doc(db, "info", "testimonials");
const brandRef = doc(db, "info", "brand");
const countriesRef = doc(db, "info", "countries");

export async function handleCountriesData() {
  try {
    const docSnap = await getDoc(countriesRef);
    const { countries } = docSnap.data();
    return countries;
  } catch (e) {
    throw new Error(e);
  }
}

export async function handleBannnersColorsData() {
  try {
    const docSnap = await getDoc(colorsRef);
    return docSnap.data();
  } catch (e) {
    throw new Error(e);
  }
}

export async function handleInitialInfoData() {
  try {
    const docSnap = await getDoc(infoRef);
    const data = Object.values(docSnap.data());

    const dataWithBanners = await Promise.all(
      data.map(async (item) => {
        const imgURL = await setImagesURLs(item.img);
        const imgPhoneURL = await setImagesURLs(item.imgphone);
        return {
          ...item,
          img: imgURL,
          imgphone: imgPhoneURL,
          imgPath: item.img,
          imgPhonePath: item.imgphone,
        };
      })
    );

    return dataWithBanners;
  } catch (e) {
    throw new Error(e);
  }
}

export async function handleNewsData() {
  const docSnap = await getDoc(newsRef);
  const news = Object.values(docSnap.data());
  const newsWithImages = await Promise.all(
    news.map(async (item) => {
      const imgURL = await setImagesURLs(item.img);
      const date = item.uploadedAt ? item.uploadedAt.toDate() : null;
      return {
        ...item,
        image: imgURL,
        imagePath: item.img,
        uploadedAt: date,
      };
    })
  );
  return newsWithImages;
}

export async function handleTestimonialsData() {
  const docSnap = await getDoc(testimonialsRef);
  const testimonials = Object.values(docSnap.data());

  const testimonialsWithImages = await Promise.all(
    testimonials.map(async (item) => {
      const imgURL = await setImagesURLs(item.portrait);
      const date = item.uploadedAt ? item.uploadedAt.toDate() : null;
      return {
        ...item,
        uploadedAt: date,
        portrait: imgURL,
        portraitPath: item.portrait,
      };
    })
  );
  return testimonialsWithImages;
}

export async function handlePagesData() {
  try {
    const docSnap = await getDoc(pagesRef);
    const categoriesData = Object.values(docSnap.data());
    //Ordena por orden alfabético
    // categoriesData.sort((a, b) => a.title.localeCompare(b.title));
    //Ordena por la propiedad order del objeto, el cual es un número que va del 1 al 4
    categoriesData.sort((a, b) => a.order - b.order);
    const dataWithBanners = await Promise.all(
      categoriesData.map(async (item) => {
        const imgURL = await setImagesURLs(item.img);
        const portraitURL = await setImagesURLs(item.portrait);
        const portraitphoneURL = await setImagesURLs(item.portraitphone)
        return {
          ...item,
          img: imgURL,
          portrait: portraitURL,
          portraitphone: portraitphoneURL,
          portraitphonePath: item.portraitphone,
          imgPath: item.img,
          portraitPath: item.portrait,
        };
      })
    );

    return dataWithBanners;
  } catch (e) {
    throw new Error(e);
  }
}

export async function handleBrandData() {
  try {
    const docSnap = await getDoc(brandRef);
    const brandData = Object.values(docSnap.data());
    const brandWithImages = await Promise.all(
      brandData.map(async (item) => {
        const imgURL = await setImagesURLs(item.img);
        return {
          ...item,
          img: imgURL,
        };
      })
    );
    return brandWithImages;
  } catch (e) {
    throw new Error(e);
  }
}

export async function handleProductsData(catalog, id) {
  try {
    const productRef = collection(db, catalog);
    if (id) {
      const ref = doc(db, catalog, id);
      const productSnap = await getDoc(ref);
      const productFromFirestore = productSnap.data();
      const imagesURL = await Promise.all(
        productFromFirestore.images.map(async (path) => {
          const imgURL = await setImagesURLs(path);
          return imgURL;
        })
      );
      const datasheetURL = await setImagesURLs(productFromFirestore?.datasheet);
      const secondaryDatasheetURL = await setImagesURLs(
        productFromFirestore?.secondarydatasheet
      );
      const { categories, department, subcategory } =
        await handleCategoriesData(catalog);
      const categorieTitle = findAttribute(
        categories,
        productFromFirestore?.category
      );
      const departmentArray =
        department && productFromFirestore.department
          ? department.filter((item) => {
              const productDepartment = productFromFirestore.department;
              for (const department of productDepartment) {
                if (department === item.id) {
                  return true;
                }
              }
              return false;
            })
          : null;
      const subcategoryTitle = findAttribute(
        subcategory,
        productFromFirestore?.subcategory
      );
      return {
        ...productFromFirestore,
        images: imagesURL[0] ? imagesURL : null,
        imagesPath: productFromFirestore.images,
        datasheet: datasheetURL,
        datasheetPath: productFromFirestore.datasheet,
        secondarydatasheet: secondaryDatasheetURL,
        secondarydatasheetPath: productFromFirestore.secondarydatasheet,
        department: departmentArray ? departmentArray : null,
        category: categorieTitle ? categorieTitle.title : null,
        subcategory: subcategoryTitle ? subcategoryTitle.title : null,
      };
    } else {
      const q = query(productRef, where("id", "!=", "categories"));
      const querySnapshot = await getDocs(q);
      const products = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const document = doc.data();
          const imagePortrait = await setImagesURLs(document?.images[0]);
          return {
            ...document,
            portrait: imagePortrait,
          };
        })
      );

      return products;
    }
  } catch (e) {
    throw new Error(e);
  }
}
export async function handleCategoriesData(id) {
  try {
    const categoriesRef = doc(db, id, "categories");
    const docSnap = await getDoc(categoriesRef);
    return docSnap.data();
  } catch (e) {
    throw new Error(e);
  }
}

export async function getAllProducts(catalog) {
  const productRef = collection(db, catalog);
  const q = query(productRef, where("id", "!=", "categories"));
  const querySnapshot = await getDocs(q);
  let products = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    products.push(doc.data());
  });
  return products;
}
