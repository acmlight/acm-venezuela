import {
  updateBanners,
  updateMedicalCategory,
  updateNews,
  updateCategories,
  updateSubcategory,
  updateProduct,
  updateTestimony,
} from "../firebase/update";
import {
  createMedicalCategory,
  createTestimony,
  createProductCategory,
  createSubcategory,
  addProduct,
  createBrand,
} from "../firebase/create";
import { removeAccents } from "./removeAccents";
import { removeSpaces } from "./removeSpaces";
import { getIdFromLink } from "./getIdFromLink";
import { generateImgId } from "./generateImgId";

const genericToastMsg = (msg) => {
  if (msg) {
    return {
      description: msg,
      status: "error",
      duration: 3000,
    };
  }
  return {
    description: "Actualizado correctamente",
    status: "success",
    duration: 3000,
  };
};

export const submitBanners = async (
  prevImgPath,
  prevImgPhonePath,
  id,
  data,
  enableFields,
  toast
) => {
  const img = data.img[0];
  const imgphone = data.imgphone[0];
const imgId = generateImgId();
  try {
    await updateBanners(id, {
      ...data,
      img: img ? `info/banners/${imgId}${img.name}` : prevImgPath,
      imgphone: imgphone
        ? `info/banners/${imgId}${imgphone.name}`
        : prevImgPhonePath,
      imgFile: img,
      imgphoneFile: imgphone,
    });
    enableFields();
    toast(genericToastMsg());
  } catch (e) {
    toast(genericToastMsg(e.message));
    enableFields();
  }
};

export const submitMedicalCategory = async ({
  imgPath,
  portraitPath,
  portraitphonePath,
  data,
  enableFields,
  edit,
  onClose,
  toast,
}) => {
  const img = data.img[0];
  const portrait = data.portrait[0];
  const portraitphone = data.portraitphone[0];
  const imgId = generateImgId();
  try {
    if (edit) {
      await updateMedicalCategory({
        title: data.title,
        id: data.id,
        imgFile: img,
        portraitFile: portrait,
        portraitphoneFile: portraitphone,
        img: img ? `info/pages/${imgId}${img.name}` : imgPath,
        portrait: portrait
          ? `info/pages/${imgId}${portrait.name}`
          : portraitPath,
        portraitphone: portraitphone
          ? `info/pages/${imgId}${portraitphone.name}`
          : portraitphonePath,
        order: data.order ? data.order : 99,
      });
      enableFields();
    } else {
      //Al crear una nueva categoria medica no se especifica el orden aparicion de esta, por lo que por defecto irá de última
      const newId = removeAccents(removeSpaces(data.title.toLowerCase()));
      await createMedicalCategory({
        title: data.title,
        id: newId,
        imgFile: img,
        portraitFile: portrait,
        img: `info/pages/${imgId}${img.name}`,
        portrait: `info/pages/${imgId}${portrait.name}`,
      });

      onClose();
    }
    toast(genericToastMsg());
  } catch (e) {
    console.log(e);
  }
};

export const submitNews = async ({ data, enableFields, imagePath, toast }) => {
  const img = data.image[0];
const imgId = generateImgId();
  try {
    await updateNews({
      id: data.id,
      img: img ? `info/pages/${imgId}${img.name}` : imagePath,
      imgFile: img,
      link: data.link,
      title: data.title,
    });
    enableFields();
    toast(genericToastMsg());
  } catch (e) {
    enableFields();
    toast(genericToastMsg(e.message));
  }
};

export const submitTestimonials = async ({
  id,
  link,
  data,
  toast,
  onClose,
  edit,
  enableFields,
  prevPortraitPath,
}) => {
  const portrait = data.portrait[0];
const imgId = generateImgId();
  const portraitPath = portrait
    ? `info/testimonials/${imgId}${portrait.name}`
    : prevPortraitPath;

  try {
    if (edit) {
      await updateTestimony({
        id,
        link,
        portraitFile: portrait,
        portraitPath,
      });
      enableFields();
    } else {
      const id = getIdFromLink(data.link);
      await createTestimony({
        id,
        link: data.link,
        portrait: `info/testimonials/${imgId}${portrait.name}`,
        portraitFile: portrait,
      });
      onClose();
    }
    toast(genericToastMsg());
  } catch (e) {
    toast(genericToastMsg(e.message));
    console.log(e);
  }
};

export const submitBrand = async ({ data, toast, onClose }) => {
  const img = data.img[0];
  const imgId = generateImgId()
  const imgPath = `info/brand/${imgId}${img.name}`;
  const newId = removeAccents(removeSpaces(data.title.toLowerCase()));
  try {
    await createBrand({
      id: newId,
      title: data.title,
      img: imgPath,
      imgFile: img,
    });
    toast(genericToastMsg());
    onClose();
  } catch (e) {
    toast(genericToastMsg(e.message));
    console.log(e);
  }
};

export const submitCategories = async ({
  data,
  department,
  enableFields,
  page,
  onClose,
  edit,
  toast,
}) => {
  try {
    if (edit) {
      const valuesArray = Object.entries(data);
      const objectData = valuesArray.map(([id, title]) => ({
        id,
        title,
      }));
      await updateCategories(objectData, page.id, department);
      enableFields();
    } else {
      const newId = removeAccents(removeSpaces(data.title.toLowerCase()));
      const title = data.title.trim();
      await createProductCategory(
        {
          id: newId,
          title,
        },
        page.id,
        department
      );
      onClose();
    }
    toast(genericToastMsg());
  } catch (e) {
    if (edit) {
      enableFields();
    }
    toast(genericToastMsg(e.message));
    console.log(e);
  }
};

export const submitSubcategories = async ({
  data,
  enableFields,
  subcategories,
  catalog,
  edit,
  onClose,
  toast,
}) => {
  const img = data.img[0];
const imgId = generateImgId()
  try {
    if (edit) {
      await updateSubcategory(
        {
          id: data.id,
          img: img ? `products/subcategory/${imgId}${img.name}` : data.imgPath,
          imgFile: img,
          title: data.title,
          category: data.category,
        },
        catalog,
        subcategories
      );
      enableFields();
    } else {
      const newId = removeAccents(removeSpaces(data.title.toLowerCase()));
      const title = data.title.trim();
      await createSubcategory(
        {
          id: newId,
          title,
          img: `products/subcategory/${imgId}${img.name}`,
          category: data.category,
        },
        catalog,
        img
      );
      onClose();
    }
    toast(genericToastMsg());
  } catch (e) {
    if (edit) {
      enableFields();
    }
    toast(genericToastMsg(e.message));
    console.log(e);
  }
};

export const submitAddProduct = async (data, toast, reset) => {
  const datasheetFile = data.datasheet[0];
  const secondarydatasheetFile = data.secondarydatasheet[0];
const imgId = generateImgId()
  try {
    await addProduct(
      {
        brand: data.brand,
        category: data.category,
        subcategory: data.subcategory ? data.subcategory : "",
        department: data.department ? data.department : [],
        country: data.country,
        videos: data.videos,
        web: data.web,
        title: data.title,
        description: data.description,
        details: data.details,
        tecnical: data.tecnical,
        datasheet: datasheetFile
          ? `products/${imgId}${datasheetFile.name}`
          : "",
        secondarydatasheet: secondarydatasheetFile
          ? `products/${imgId}${secondarydatasheetFile.name}`
          : "",
      },
      datasheetFile,
      secondarydatasheetFile,
      data.images,
      data.catalog
    );
    toast({
      description: "Producto agregado correctamente",
      status: "success",
      duration: 3000,
    });
    reset();
  } catch (e) {
    toast({
      description: e.message,
      status: "error",
      duration: 3000,
    });
  }
};

export const submitEditProduct = async (data, toast, reset) => {
  const datasheetFile = data.datasheet[0];
  const secondarydatasheetFile = data.secondarydatasheet[0];
const imgId = generateImgId()
  try {
    await updateProduct(
      {
        id: data.id,
        brand: data.brand,
        category: data.category,
        subcategory: data.subcategory ? data.subcategory : "",
        department: data.department ? data.department : [],
        country: data.country,
        videos: data.videos,
        web: data.web,
        title: data.title,
        description: data.description,
        details: data.details,
        tecnical: data.tecnical,
        datasheet: datasheetFile ? `products/${imgId}${datasheetFile.name}` : "",
        secondarydatasheet: secondarydatasheetFile
          ? `products/${imgId}${secondarydatasheetFile.name}`
          : "",
      },
      datasheetFile,
      secondarydatasheetFile,
      data.images,
      data.catalog
    );

    toast({
      description: "Producto agregado correctamente.",
      status: "success",
      duration: 3000,
    });
  } catch (e) {
    toast({
      description: e.message,
      status: "error",
      duration: 3000,
    });
  }
};
