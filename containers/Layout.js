import Head from "next/head";
import Footer from "../components/Footer";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import IconButton from "../components/IconButton";
import dynamic from 'next/dynamic'

const DynamicNavBar = dynamic(() => import("../components/Navbar"),{
  ssr: false,
  loading: () => null
})

const DynamicCart = dynamic(() => import("../components/Cart"),{
  loading: () => null
})

const Layout = ({ children, title, description, atTop, pages }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* <meta name="robots" content="noindex"/> */}
      </Head>
      <DynamicCart isOpen={isOpen} onClose={onClose} />
      <DynamicNavBar atTop={atTop} pages={pages} openCart={onOpen} />
      <m.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.75,
        }}
      >
        {children}
      </m.div>
      <a
        href="https://api.whatsapp.com/send?phone=584242639613"
        target="_blank"
      >
        <IconButton
          icon={<AiOutlineWhatsApp />}
          size="lg"
          style={{ position: "fixed", bottom: "20px", left: "20px" }}
        />
      </a>

      <Footer />
    </>
  );
};

export default Layout;
