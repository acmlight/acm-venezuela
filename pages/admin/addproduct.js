import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";
import {
  CardBody,
  Card,
  Heading,
  Grid,
  GridItem,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";
import AdminInput from "../../components/Admin/AdminInput";
import AdminSelector from "../../components/Admin/AdminSelector";
import { maxLengthMessage, minLengthMessage } from "../../utils/adminUtils";
import { useForm } from "react-hook-form";
import AdminCheckbox from "../../components/Admin/AdminCheckbox";
import useCategories from "../../hooks/useCategories";
import AdminInputGroup from "../../components/Admin/AdminInputGroup";
import AdminInputFile from "../../components/Admin/AdminInputFile";
import AdminImageGroup from "../../components/Admin/AdminImageGroup";
import RichText from "../../components/RichText";
import { submitAddProduct } from "../../utils/adminForms";

const AddProduct = ({ pages, brands, countries, selectorPages }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      videos: [""],
    },
  });
  const toast = useToast();
  const watchCatalog = watch("catalog");
  const watchVideos = watch("videos");
  const { category, department, subcategory } = useCategories(watchCatalog);

  return (
    <>
      <AdminLayout pages={pages} auth={auth}>
        <Card w="100%" variant="elevated">
          <CardBody p={12}>
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl" }}
              color="brand.300"
              mb={{ base: "5px", md: "20px" }}
            >
              Añadir producto
            </Heading>
            <form onSubmit={handleSubmit((data) => submitAddProduct(data,toast,reset))}>
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
                <GridItem colSpan={4}>
                  <AdminSelector
                    isRequired
                    register={register}
                    label="Seleccione especialidad"
                    id="catalog"
                    error={errors.catalog}
                    selectors={selectorPages}
                  />
                </GridItem>

                {category && (
                  <GridItem colSpan={2}>
                    <AdminSelector
                      isRequired
                      register={register}
                      label="Seleccione categoría principal"
                      id="category"
                      error={errors.category}
                      selectors={category}
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
                  <AdminSelector
                    isRequired
                    register={register}
                    label="Seleccione país"
                    id="country"
                    error={errors.country}
                    selectors={countries}
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
                    label="Datasheet Primario"
                    register={register}
                    id="datasheet"
                    error={errors.datasheet}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <AdminInputFile
                    label="Datasheet Secundario"
                    register={register}
                    id="secondarydatasheet"
                    error={errors.secondarydatasheet}
                  />
                </GridItem>
                <GridItem colSpan={4}>
                  <AdminImageGroup
                    isRequired
                    id="images"
                    error={errors.images}
                    label="Imágenes de producto (max. 100kb) y dimensiones (500 x 500)"
                    register={register}
                    control={control}
                  ></AdminImageGroup>
                </GridItem>
                <GridItem colSpan={4}>
                  <RichText
                    isRequired
                    control={control}
                    label="Descripción del producto (max 1500 carac.)"
                    id="description"
                    error={errors.description}
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
                    {isSubmitting ? <Spinner color="white" size="xs" /> : <>Guardar</>}
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </CardBody>
        </Card>
      </AdminLayout>
    </>
  );
};

export default AddProduct;

export async function getServerSideProps(ctx) {
  const {
    handlePagesData,
    handleBrandData,
    handleCategoriesData,
    handleCountriesData,
  } = await import("../../firebase/api");
  const pages = await handlePagesData();
  const selectorPages = pages.map((page) => ({
    id: page.id,
    title: page.title,
  }));
  const brands = await handleBrandData();
  const countries = await handleCountriesData();
  return {
    props: {
      pages,
      selectorPages,
      brands,
      countries,
    },
  };
}
