import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";

import { SimpleGrid, Button, useDisclosure } from "@chakra-ui/react";

import BrandCategories from "../../components/Admin/General/BrandCategories";
import Modal from "../../components/Modal";
import { useState } from "react";

import BrandModal from "../../components/Admin/General/BrandModal";
import { submitBrand } from "../../utils/adminForms";

const Admin = ({ pages, brands }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInput, setModalInput] = useState();
  const [modalTitle, setModalTitle] = useState();

  const handleBrandModal = () => {
    setModalTitle("Añade nuevo fabricante");
    setModalInput(<BrandModal onClose={onClose} onSubmit={submitBrand} />);
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
          size="sm"
          m="10px 0 20px 0"
          onClick={() => handleBrandModal()}
        >
          Añadir fabricante
        </Button>
        <SimpleGrid p="10px" columns={3} spacing={8}>
          {brands.map((brand) => (
            <BrandCategories key={brand.id} {...brand} />
          ))}
        </SimpleGrid>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const { handlePagesData, handleBrandData } = await import(
    "../../firebase/api"
  );
  const [pagesData, brands] = await Promise.all([
    handlePagesData(),
    handleBrandData(),
  ]);

  return {
    props: {
      pages: pagesData,
      brands,
    },
  };
}
