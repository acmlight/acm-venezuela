import Modal from "../Modal";
import ItemCart from "./ItemCart";
import { useProductStore } from "../../state";
import FooterCart from "./FooterCart";
import { sendCotizacionForm } from "../../utils/fetchMailApi";
import { useToast } from "@chakra-ui/react";
import { useState} from "react";
import useStore from "../../hooks/useStore";

const Cart = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  const equipment = useStore(useProductStore, (state) => state.equipment);

  const onSubmit = async (data) => {
    if (data.sweet) {
      return;
    }
    setLoader(true);
    const quote = equipment.map((item) => item.title);
    try {
      await sendCotizacionForm({
        ...data,
        equipos: quote,
      });
      toast({
        title: "¡ Mensaje enviado !",
        description:
          "Nuestros vendedores se contactarán contigo a la brevedad posible.",
        status: "success",
        duration: 3000,
      });
      setLoader(false);
      onClose();
    } catch (e) {
      setLoader(false);
      toast({
        title: " Oops ... ",
        description: e.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Solicita una cotización"
      scrollBehavior="inside"
      footer={<FooterCart onSubmit={onSubmit} loader={loader} />}
    >
      {equipment &&
        equipment.map((item) => <ItemCart item={item} key={item.id} />)}
    </Modal>
  );
};

export default Cart;
