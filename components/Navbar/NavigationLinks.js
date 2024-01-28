import {
  IconButton as IconButtonChakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Show,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../assets/styles/NavBar.module.css";
import { useRouter } from "next/router";

const NavigationLinks = ({ style, pages }) => {
  const router = useRouter();
  //Si hay datos en el session storage con respecto al número de pestaña o productos en el estado search, al cambiar de página me aseguro
    //de eliminarlos antes de navegar a otra especialidad para evitar errores de visualización
  const onNavigateCatalog = async (page) => {
    // Eliminar datos del sessionStorage
    sessionStorage.removeItem("tabIndex");
    sessionStorage.removeItem("search");
    router.push(`/productos/${page.id}`);
  };
  return (
    <>
      <Link href="/">Inicio</Link>
      <Link href="/nosotros">Nosotros</Link>
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Options"
          variant="link"
          rightIcon={<IoIosArrowDown />}
          className={style}
        >
          Productos
        </MenuButton>
        <MenuList className={styles.productList} zIndex={100}>
          {pages.map((page, index) => (
            <MenuItem
              key={page.id}
              color="brand.500"
              minH="35px"
              onClick={() => onNavigateCatalog(page)}
            >
              {page.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Link href="/#servicios" scroll={false}>
        Servicios
      </Link>
      <Show below="md">
        <Link href="/contacto">Contacto</Link>
      </Show>
    </>
  );
};

export default NavigationLinks;
