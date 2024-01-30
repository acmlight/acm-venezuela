import { doc, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { db } from "./config";
import { deleteImage } from "../utils/deleteImage";

const testimonyRef = doc(db, "info", "testimonials");

export const deleteTestimony = async (id, portraitPath) => {
  try {
    await updateDoc(testimonyRef, {
      [id]: deleteField(),
    });
    await deleteImage(portraitPath)
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteBrand = async (id) => {
  const productRef = doc(db, "info", "brand");
  try {
    await updateDoc(productRef, {
      [id]: deleteField(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteProduct = async (catalog, id) => {
  const productRef = doc(db, catalog, id);
  try {
    await deleteDoc(productRef);
  } catch (e) {
    throw new Error(e);
  }
};
