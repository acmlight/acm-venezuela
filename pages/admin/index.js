import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";
import Accord from "../../components/Accordion";
import Banners from "../../components/Admin/General/Banners";
import { SimpleGrid, Button, useDisclosure, Text } from "@chakra-ui/react";
import MedicalCategories from "../../components/Admin/General/MedicalCategories";
import AdminTestimonials from "../../components/Admin/General/AdminTestimonials";
import AdminNews from "../../components/Admin/General/AdminNews";
import BrandCategories from "../../components/Admin/General/BrandCategories";
import formatDate from "../../utils/formatDate";
import Modal from "../../components/Modal";
import { useState } from "react";
import MedicalModal from "../../components/Admin/General/MedicalModal";
import TestimonialsModal from "../../components/Admin/General/TestimonialsModal";
import BrandModal from "../../components/Admin/General/BrandModal";
import {
  submitBanners,
  submitMedicalCategory,
  submitNews,
  submitTestimonials,
  submitBrand
} from "../../utils/adminForms";
import BannerColors from "../../components/Admin/General/BannerColors";

const Admin = ({ pages, banners, brands, testimonials, newsWithDate, colors }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInput, setModalInput] = useState();
  const [modalTitle, setModalTitle] = useState();
  const handleMedicalModal = () => {
    setModalTitle("Añadir categoría médica");
    setModalInput(
      <MedicalModal onClose={onClose} onSubmit={submitMedicalCategory} />
    );
    onOpen();
  };
  const handleTestimonialsModal = () => {
    setModalTitle("Añade testimonios");
    setModalInput(
      <TestimonialsModal onClose={onClose} onSubmit={submitTestimonials} />
    );
    onOpen();
  };
  const handleBrandModal = () => {
    setModalTitle('Añade nuevo fabricante')
    setModalInput(
      <BrandModal onClose={onClose} onSubmit={submitBrand} />
    )
    onOpen()
  }
  return (
    <>
      <AdminLayout pages={pages} auth={auth}>
        <Modal
          title={modalTitle}
          scrollBehavior="inside"
          isOpen={isOpen}
          onClose={onClose}
        >
          {modalInput}
        </Modal>
        <Accord title="Banners">
          <BannerColors primary={colors.primary} secondary={colors.secondary}/>
          <SimpleGrid columns={2} spacing={8} mt={8}>
            {banners.map((banner) => (
              <Banners
                key={banner.title}
                onSubmit={submitBanners}
                {...banner}
              />
            ))}
          </SimpleGrid>
        </Accord>
        <Accord title="Categorías Médicas" divider>
          <Button
            bg="brand.100"
            color="white"
            boxShadow="md"
            size="sm"
            m="10px 0 20px 0"
            onClick={() => handleMedicalModal()}
          >
            Añadir categoría
          </Button>
          <SimpleGrid columns={2} spacing={8}>
            {pages.map((page) => (
              <MedicalCategories
                key={page.id}
                onSubmit={submitMedicalCategory}
                {...page}
              />
            ))}
          </SimpleGrid>
        </Accord>
        <Accord title="Testimonios" divider>
          <Button
            bg="brand.100"
            color="white"
            boxShadow="md"
            size="sm"
            m="10px 0 20px 0"
            onClick={() => handleTestimonialsModal()}
          >
            Añadir testimonio
          </Button>
          <SimpleGrid p="10px" columns={3} spacing={8}>
            {testimonials.map((testimony) => (
              <AdminTestimonials
                key={testimony.id}
                {...testimony}
              />
            ))}
          </SimpleGrid>
          <Text fontSize='sm' color='brand.500'>Nota: si se crea un testimonio con un link ya existente, el resultado será la edición de dicho testimonio.</Text>
        </Accord>
        <Accord title="Novedades" divider>
          <SimpleGrid columns={2} spacing={8}>
            {newsWithDate.map((item) => (
              <AdminNews key={item.title} onSubmit={submitNews} {...item} />
            ))}
          </SimpleGrid>
        </Accord>
        <Accord title="Fabricantes" divider>
        <Button
            bg="brand.100"
            color="white"
            boxShadow="md"
            size="sm"
            m="10px 0 20px 0"
            onClick={() => handleBrandModal()}
          >
            Añadir fabricante
          </Button>
        <SimpleGrid p='10px' columns={3} spacing={8}>
              {brands.map((brand) => (
                <BrandCategories
                  key={brand.id}

                  {...brand}
                />
              ))}
        </SimpleGrid>
        </Accord>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps(ctx) {
  const {
    handleInitialInfoData,
    handlePagesData,
    handleNewsData,
    handleTestimonialsData,
    handleBrandData,
    handleBannnersColorsData
  } = await import("../../firebase/api");
  const banners = await handleInitialInfoData();
  const colors = await handleBannnersColorsData()
  const pages = await handlePagesData();
  const brands = await handleBrandData();
  const newsData = await handleNewsData();
  newsData.sort((a, b) => b.uploadedAt - a.uploadedAt);
  const newsWithDate = newsData.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });
  const testimonials = await handleTestimonialsData();
  testimonials.sort((a, b) => {
    // Verificar si la propiedad uploadedAt existe en ambas instancias
    if (a.uploadedAt && b.uploadedAt) {
      return b.uploadedAt - a.uploadedAt;
    } else {
      // Manejar el caso en que uploadedAt no existe en alguna de las instancias
      console.warn("Al menos una instancia no tiene la propiedad uploadedAt.");
      return 0;
    }
  });
  const testimonialsWithDate = testimonials.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });
  return {
    props: {
      banners,
      colors,
      pages,
      brands,
      testimonials: testimonialsWithDate,
      newsWithDate,
    },
  };
}
