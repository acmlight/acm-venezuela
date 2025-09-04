import { removeAccents } from "./removeAccents";

const submitSearch = (data, products, t) => {
  // Extraer los valores de búsqueda
  const { department, brand, search } = data;
  
  // Verificar si hay al menos un criterio de búsqueda
  const hasSearchCriteria = department || brand || search;
  
  if (!hasSearchCriteria) {
    return {
      description: "No encontramos productos con estas características",
      status: "warning",
      duration: 3000,
    };
  }

  // Filtrar productos basado en todos los criterios proporcionados
  let filteredProducts = products;

  // Filtrar por department si se proporciona
  if (department) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.department) return false;
      const departments = Array.isArray(product.department)
        ? product.department
        : [product.department];
      return departments.includes(department);
    });
  }

  // Filtrar por brand si se proporciona
  if (brand) {
    filteredProducts = filteredProducts.filter((product) => 
      product.brand === brand
    );
  }

  // Filtrar por búsqueda de texto si se proporciona
  if (search) {
    const searchLowerCase = removeAccents(search.toLowerCase());
    filteredProducts = filteredProducts.filter((item) => {
      const normalizedTitle = removeAccents(item.title.toLowerCase());
      const titleMatch = item.title
        ? normalizedTitle.includes(searchLowerCase)
        : false;
      const countryMatch = item.country
        ? item.country.toLowerCase().includes(searchLowerCase)
        : false;

      return titleMatch || countryMatch;
    });
  }

  // Retornar resultados o mensaje de error
  if (filteredProducts.length > 0) {
    return filteredProducts;
  } else {
    
    return {
      description: "No encontramos productos con estas características",
      status: "info",
      duration: 3000,
    };
  }
};

export default submitSearch;
