import AdminLayout from "../../../containers/AdminLayout";
import Accord from "../../../components/Accordion";
import { setImagesURLs } from "../../../utils/setImagesURLs";
import AdminCategories from "../../../components/Admin/Products/AdminCategories";
import { SimpleGrid, Button, useDisclosure, Box } from "@chakra-ui/react";
import {
  submitCategories,
  submitSubcategories,
} from "../../../utils/adminForms";
import AdminSubcategories from "../../../components/Admin/Products/AdminSubcategories";
import Modal from "../../../components/Modal";
import { useState } from "react";
import ProductCategoriesModal from "../../../components/Admin/Products/ProductCategoriesModal";
import ProductSubcategoriesModal from "../../../components/Admin/Products/ProductSubcategoriesModal";
import AdminProductDashboard from "../../../components/Admin/Products/AdminProductDashboard";
import Link from "next/link";

const AdminProductos = ({
  page,
  pages,
  categories,
  department,
  subcategory,
  subcategories,
  products,
  brands
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disabled, setDisabled] = useState(false);
  const [modalInput, setModalInput] = useState();
  const [modalTitle, setModalTitle] = useState();
  const handleCategoriesModal = (title, department) => {
    setModalTitle(title);
    setModalInput(
      <ProductCategoriesModal
        onClose={onClose}
        onSubmit={submitCategories}
        department={department}
        page={page}
      />
    );
    onOpen();
  };

  const handleSubcategoriesModal = () => {
    setModalTitle(`Añade subcategoría para ${page.title}`);
    setModalInput(
      <ProductSubcategoriesModal
        onClose={onClose}
        onSubmit={submitSubcategories}
        page={page}
        categories={categories}
      />
    );
    onOpen();
  };
  return (
    <AdminLayout pages={pages}>
      <Modal
        title={modalTitle}
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        {modalInput}
      </Modal>
      <Accord title="Clasificación de productos">
        <SimpleGrid gap={10}>
          {categories && (
            <AdminCategories
              categories={categories}
              page={page}
              handleModal={handleCategoriesModal}
              onSubmit={submitCategories}
              btnTitle="Añadir categoría"
              department={false}
            />
          )}

          <AdminCategories
            categories={department}
            page={page}
            handleModal={handleCategoriesModal}
            onSubmit={submitCategories}
            btnTitle="Añadir departamento"
            department={true}
          />

          <Accord title="Sub-categorías">
            <Button
              bg="brand.100"
              color="white"
              boxShadow="md"
              size="sm"
              m="10px 0 20px 0"
              onClick={() => handleSubcategoriesModal()}
            >
              Añadir Sub-categoría
            </Button>
            <SimpleGrid columns={2} spacing={8}>
              {subcategory &&
                subcategory.map((subcat) => (
                  <AdminSubcategories
                    key={subcat.id}
                    onSubmit={submitSubcategories}
                    subcategories={subcategories}
                    page={page}
                    {...subcat}
                  />
                ))}
            </SimpleGrid>
          </Accord>
        </SimpleGrid>
      </Accord>
      <Box mt="40px">
        <Link href="addproduct">
          <Button bg="brand.100" color="white" boxShadow="md" size="sm">
            Añadir Producto
          </Button>
        </Link>

        <AdminProductDashboard
          products={products}
          categories={categories}
          page={page}
          disabled={disabled}
          brand={brands}
          setDisabled={setDisabled}
        />
      </Box>
    </AdminLayout>
  );
};

export default AdminProductos;

// export async function getStaticPaths() {
//   const { handlePagesData } = await import("../../../firebase/api");
//   const pages = await handlePagesData();

//   const paths = pages.map((page) => ({
//     params: { catalog: page.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const {
    handleBrandData,
    handlePagesData,
    handleProductsData,
    handleCategoriesData,
  } = await import("../../../firebase/api");
  const pages = await handlePagesData();
  const brands = await handleBrandData();
  const page = { ...pages.filter((page) => page.id === params.catalog) };
  const productsFromFirestore = await handleProductsData(params.catalog);

  const products = productsFromFirestore.map((item) => ({
    id: item.id,
    title: item.title,
    brand: item.brand,
    department: item.department,
    subcategory: item.subcategory,
    category: item.category,
    portrait: item.portrait
  }))

  products.sort((a, b) => a.brand.localeCompare(b.brand))
  const categories = await handleCategoriesData(params.catalog);

  let subcategoryWithImages = [];
  if (categories && categories.subcategory) {
    subcategoryWithImages = await Promise.all(
      categories.subcategory.map(async (item) => {
        if (item.img) {
          const imgURL = await setImagesURLs(item.img);
          return {
            ...item,
            img: imgURL,
            imgPath: item.img,
          };
        }
        return {
          ...item,
          img: "",
        };
      })
    );
  }

  return {
    props: {
      subcategory: subcategoryWithImages,
      subcategories:
        categories && categories.subcategory ? categories.subcategory : null,
      department:
        categories && categories.department ? categories.department : null,
      brands,
      categories:
        categories && categories.categories ? categories.categories : null,
      page: page[0],
      pages,
      products
    },
  };
}
