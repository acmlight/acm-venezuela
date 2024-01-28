import { useState, useEffect } from "react";
import { handleCategoriesData } from "../firebase/api";

const useCategories = (watchCatalog) => {
  const [subcategory, setSubcategory] = useState(null);
  const [department, setDepartment] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories, department, subcategory } =
          await handleCategoriesData(watchCatalog);
        const selectorSubcategory = subcategory
          ? subcategory.map((subcat) => ({
              id: subcat.id,
              title: subcat.title,
            }))
          : null;
        if (mounted) {
          setCategory(categories);
          setDepartment(department);
          setSubcategory(selectorSubcategory);
        }
      } catch (e) {
        console.error("Error en la solicitud:", e);
      }
    };
    let mounted = true;
    if (watchCatalog) {
      fetchCategories();
    }
    // Limpiar la bandera cuando el componente se desmonta
    return () => {
      mounted = false;
    };
  }, [watchCatalog]);

  return {
    subcategory,
    department,
    category
  }
};

export default useCategories;
