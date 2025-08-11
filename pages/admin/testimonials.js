import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";
import { SimpleGrid, Button, useDisclosure, Text } from "@chakra-ui/react";
import AdminTestimonials from "../../components/Admin/General/AdminTestimonials";

import formatDate from "../../utils/formatDate";
import Modal from "../../components/Modal";
import { useState } from "react";
import TestimonialsModal from "../../components/Admin/General/TestimonialsModal";
import { submitTestimonials } from "../../utils/adminForms";

const Admin = ({
  pages,
  testimonials,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInput, setModalInput] = useState();
  const [modalTitle, setModalTitle] = useState();

  const handleTestimonialsModal = () => {
    setModalTitle("Añade testimonios");
    setModalInput(
      <TestimonialsModal onClose={onClose} onSubmit={submitTestimonials} />
    );
    onOpen();
  };

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

        <Button
          bg="brand.100"
          color="white"
          boxShadow="md"
          m="10px 0 20px 0"
          onClick={() => handleTestimonialsModal()}
        >
          Añadir testimonio
        </Button>
        <SimpleGrid p="10px" columns={3} spacing={8}>
          {testimonials.map((testimony) => (
            <AdminTestimonials key={testimony.id} {...testimony} />
          ))}
        </SimpleGrid>
        <Text fontSize="sm" color="brand.500">
          Nota: si se crea un testimonio con un link ya existente, el resultado
          será la edición de dicho testimonio.
        </Text>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const { handlePagesData, handleTestimonialsData } = await import(
    "../../firebase/api"
  );
  const [pagesData, testimonials] = await Promise.all([
    handlePagesData(),
    handleTestimonialsData(),
  ]);


  testimonials.sort((a, b) => {
    if (a.uploadedAt && b.uploadedAt) {
      return b.uploadedAt - a.uploadedAt;
    } else {
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
      pages: pagesData,
      testimonials: testimonialsWithDate,
    },
  };
}
