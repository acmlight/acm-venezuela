import IconButton from "../IconButton";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { Hide } from "@chakra-ui/react";

const NavButtons = ({ openCart }) => (
  <>
    <Hide below="md">
      <Link href="/contacto">
        <IconButton size="lg" icon={<BiSolidPhoneCall />} label="Contáctanos!" />
      </Link>
    </Hide>

    <IconButton
      size="lg"
      cart={true}
      handleClick={openCart}
      icon={<AiOutlineShoppingCart />}
      label="Solicita una cotización"
    />
  </>
);

export default NavButtons;
