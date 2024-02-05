import { auth } from "../../../firebase/config";
import AdminLayout from "../../../containers/AdminLayout";
import {
  CardBody,
  Card,
  Heading,
  Grid,
  GridItem,
  Button,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Attribute from "../../../components/ProductDetail/Attribute";
import AdminInput from "../../../components/Admin/AdminInput";
import AdminSelector from "../../../components/Admin/AdminSelector";
import AdminCheckbox from "../../../components/Admin/AdminCheckbox";
import AdminInputGroup from "../../../components/Admin/AdminInputGroup";
import AdminInputFile from "../../../components/Admin/AdminInputFile";
import AdminImageGroup from "../../../components/Admin/AdminImageGroup";
import { maxLengthMessage, minLengthMessage } from "../../../utils/adminUtils";
import RichText from "../../../components/RichText";
import { submitEditProduct } from "../../../utils/adminForms";

const EditProduct = ({
  pages,
  page,
  product,
  productBrand,
  categories,
  department,
  subcategory,
  brands
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: product.title,
      category: product.category,
      subcategory: product.subcategory,
      department: product.department,
      brand: product.brand,
      web: product.web,
      videos: product.videos,
      images: product.images,
      description: product.description,
      details: product.details,
      tecnical: product.tecnical,
    },
  });
  const watchVideos = watch("videos");

  return (
    <AdminLayout pages={pages} auth={auth}>
      <Card w="100%" variant="elevated">
        <CardBody p={12}>
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="brand.300"
            mb={{ base: "5px", md: "20px" }}
          >
            Editar producto
          </Heading>
          <Flex direction="column" gap={8} mb={12}>
            <Attribute title="Especialización" content={page.title} />
            {product.country && (
              <Attribute title="Origen" country={product.country} />
            )}
          </Flex>

          <form
            onSubmit={handleSubmit((data) =>
              submitEditProduct(
                {
                  ...data,
                  country: product.country,
                  catalog: page.id,
                  id: product.id
                },
                toast,
              )
            )}
          >
            <Grid templateColumns="repeat(4, 1fr)" gap={8}>
              <GridItem colSpan={4}>
                <AdminInput
                  isRequired
                  register={register}
                  label="Título del producto (max. 60 carac.)"
                  id="title"
                  error={errors.title}
                  options={{
                    required: "Debe rellenar este campo",
                    maxLength: {
                      value: 60,
                      message: maxLengthMessage(60),
                    },
                    minLength: {
                      value: 2,
                      message: minLengthMessage(2),
                    },
                  }}
                />
              </GridItem>
              {categories && (
                <GridItem colSpan={2}>
                  <AdminSelector
                    isRequired
                    register={register}
                    label="Seleccione categoría principal"
                    id="category"
                    error={errors.category}
                    selectors={categories}
                  />
                </GridItem>
              )}

              {subcategory && (
                <GridItem colSpan={2}>
                  <AdminSelector
                    register={register}
                    label="Seleccione sub-categoría"
                    id="subcategory"
                    error={errors.subcategory}
                    selectors={subcategory}
                  />
                </GridItem>
              )}
              {department && (
                <GridItem colSpan={4}>
                  <AdminCheckbox
                    id="department"
                    label="Seleccion departamento"
                    error={errors.department}
                    options={department}
                    register={register}
                  />
                </GridItem>
              )}
              <GridItem colSpan={2}>
                <AdminSelector
                  isRequired
                  register={register}
                  label="Seleccione fabricante"
                  id="brand"
                  error={errors.brand}
                  selectors={brands}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <AdminInputGroup
                  register={register}
                  watch={watchVideos}
                  control={control}
                  label="Añade videos"
                  id="videos"
                  error={errors.videos}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <AdminInput
                  register={register}
                  label="Web del fabricante"
                  id="web"
                  error={errors.web}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <AdminInputFile
                  path={
                    product.datasheetPath
                      ? product.datasheetPath
                      : "Sin datasheet"
                  }
                  label="Datasheet Primario"
                  register={register}
                  id="datasheet"
                  error={errors.datasheet}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <AdminInputFile
                  path={
                    product.secondarydatasheetPath
                      ? product.secondarydatasheetPath
                      : "Sin datasheet"
                  }
                  label="Datasheet Secundario"
                  register={register}
                  id="secondarydatasheet"
                  error={errors.secondarydatasheet}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <AdminImageGroup
                  id="images"
                  error={errors.images}
                  label="Imágenes de producto (max. 100kb) y dimensiones (500 x 500)"
                  register={register}
                  control={control}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <RichText
                  id="description"
                  control={control}
                  label="Descripción del producto (max 1500 carac.)"
                  rules={{
                    required: "Debe rellenar este campo",
                    maxLength: {
                      value: 1500,
                      message: maxLengthMessage(1500),
                    },
                    minLength: {
                      value: 10,
                      message: minLengthMessage(10),
                    },
                  }}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <RichText
                  control={control}
                  label="Detalles del producto"
                  id="details"
                  error={errors.details}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <RichText
                  control={control}
                  label="Detalles técnicos"
                  id="tecnical"
                  error={errors.tecnical}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <Button
                  bg="brand.300"
                  color="white"
                  boxShadow="md"
                  size="sm"
                  mt="24px"
                  type="submit"
                  w="100%"
                >
                  {isSubmitting ? (
                    <Spinner color="white" size="xs" />
                  ) : (
                    <>Guardar</>
                  )}
                </Button>
              </GridItem>
            </Grid>
          </form>
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default EditProduct;

// export async function getStaticPaths() {
//   const { getAllProducts, handlePagesData } = await import(
//     "../../../firebase/api"
//   );
//   const pages = await handlePagesData();
//   const paths = [];

//   // Recorremos los catálogos (oftalmologia,otorrino,etc) y sus productos para crear los objetos de ruta
//   for (const page of pages) {
//     const products = await getAllProducts(page.id);

//     products.forEach((producto) => {
//       paths.push({ params: { catalog: page.id, id: producto.id } });
//     });
//   }
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
  const page = { ...pages.filter((page) => page.id === params.catalog) };
  const product = await handleProductsData(params.catalog, params.id);
  const brands = await handleBrandData();
  const { categories, department, subcategory } = await handleCategoriesData(
    params.catalog
  );

  const selectorSubcategory = subcategory
    ? subcategory.map((subcat) => ({
        id: subcat.id,
        title: subcat.title,
      }))
    : null;
  const productSubcategory =
    subcategory && product.subcategory
      ? subcategory.find((item) => item.title === product.subcategory)
      : null;
  const productCategory =
    categories && product.category
      ? categories.find((item) => item.title === product.category)
      : null;
  const productDepartment = product.department
    ? product.department.map((item) => item.id)
    : null;
  const productBrand = product
    ? brands.find((item) => item.id === product.brand)
    : null;
  const productImages = product.images.map((item, index) => ({
    link: item,
    path: product.imagesPath[index],
  }));

  return {
    props: {
      page: page["0"],
      pages,
      product: {
        ...product,
        category: productCategory ? productCategory.id : null,
        subcategory: productSubcategory ? productSubcategory.id : null,
        department: productDepartment,
        images: productImages,
      },
      productBrand,
      brands,
      categories,
      department: department ? department : null,
      subcategory: selectorSubcategory,
      categories: categories ? categories : null,
    },
  };
}
