import { removeAccents } from "./removeAccents";

const submitSearch = (data, products) => {
  //Genera un array con tuplas de los keys y valores del objeto
  const entries = Object.entries(data);

  //Encuentra que tupla tiene una entrada que no sea vacía
  const foundEntry = entries.find((entry) => entry[1] != "");

  //Si el usuario seleccionó una de las opciones, se ejecuta la búsqueda dependiendo del caso
  if (foundEntry) {
    const [key, value] = foundEntry;

    switch (key) {
      case "department":
        const productsForDepartment = products.filter((product) => {
          if (product.department) {
            return product.department.some(
              (department) => department === value
            );
          } else {
            return false;
          }
        });
        if (productsForDepartment.length > 0) {
          return productsForDepartment;
        } else {
          return {
            description: "No encontramos productos con esta característica",
            status: "info",
            duration: 3000,
          };
        }
      case "brand":
        const productsForBrand = products.filter(
          (product) => product.brand === value
        );
        if (productsForBrand.length > 0) {
          return productsForBrand;
        } else {
          return {
            description: "No encontramos productos de este fabricante",
            status: "info",
            duration: 3000,
          };
        }
      case "search":
        const valueLowerCase = removeAccents(value.toLowerCase());

        const filteredResults = products.filter((item) => {
          const normalizedTitle = removeAccents(item.title.toLowerCase());
          const titleMatch = item.title
            ? normalizedTitle.includes(valueLowerCase)
            : false;
          const countryMatch = item.country
            ? item.country.toLowerCase().includes(valueLowerCase)
            : false;

          return titleMatch || countryMatch;
        });
        if (filteredResults.length > 0) {
          return filteredResults;
        } else {
          return {
            description: "No encontramos productos",
            status: "info",
            duration: 3000,
          };
        }
    }
  }
};

export default submitSearch;
