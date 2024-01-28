import Link from "next/link";

const NavigationFooterLinks = () => {

    return (
      <>
        <Link href='/'>Inicio</Link>
        <Link href='/nosotros'>Nosotros</Link>
        <Link href='/#servicios' scroll={false}>Servicios</Link>
        <Link href='/#clientes' scroll={false}>Nuestros Clientes</Link>
        <Link href='/#testimonios' scroll={false}>Testimonios</Link>
        <Link href='/contacto' scroll={false}>Contáctanos</Link>
      </>
    );
  };

export default NavigationFooterLinks