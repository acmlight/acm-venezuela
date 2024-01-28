import { Container, Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { BsFillPhoneFill } from "react-icons/bs";
import { MdLocationOn, MdOutlineCalendarMonth, MdPhone } from "react-icons/md";
import ContactMap from "../components/Contacto/ContactMap";
import Layout from "../containers/Layout";
import { sendContactForm } from "../utils/fetchMailApi";
import dynamic from "next/dynamic";
const DynamicHeader = dynamic(() => import("../components/Header"));
const DynamicContactForm = dynamic(() => import("../components/Contacto/ContactForm"))
const DynamicContactCard = dynamic(() => import("../components/Contacto/ContactCard"))


const Contacto = ({ pages }) => {
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    if(data.sweet){
      return
    }
    setLoader(true);

    try {
      await sendContactForm({
        ...data,
        token,
      });
      toast({
        title: "¡ Mensaje enviado !",
        description: "Te contactaremos a la brevedad posible.",
        status: "success",
        duration: 3000,
      });

      setLoader(false);
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
    <Layout
      atTop={false}
      pages={pages}
      title="ACM Venezuela - Contáctanos"
      description="Contácta a ACM Venezuela para solicitar una cotización en nuestros equipos de Oftalmología, Veterinaria, Otorrinolaringología o cirugía y medicina general"
    >
      <DynamicHeader image="/contact.jpg" title="Contáctanos" />
      <Container maxW={{ base: "90%", md: "70%" }} mt="120px" pb="40px">
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          <DynamicContactCard
            icon={<MdPhone size="3em" />}
            text="+58 (212) 976 3608"
            link="tel:2129763608"
          />
          <DynamicContactCard
            icon={<BsFillPhoneFill size="3em" />}
            text="+58 (424) 263 9614"
            link="tel:+584242639614"
          />
          <DynamicContactCard
            icon={<AiOutlineWhatsApp size="3em" />}
            text="+58 (424) 263 9613"
            link="https://api.whatsapp.com/send?phone=584242639613"
          />
          <DynamicContactCard
            icon={<BiLogoGmail size="3em" />}
            text="info@acm-venezuela.com"
            link="mailto:info@acm-venezuela.com"
          />
          <DynamicContactCard
            icon={<MdLocationOn size="3em" />}
            text="Terrazas de Club Hípico, Caracas - Venezuela"
            link="https://goo.gl/maps/rASaKBCJqZaZ5qi67"
          />
          <DynamicContactCard
            icon={<MdOutlineCalendarMonth size="3em" />}
            text="9:00 am - 5:00 pm de Lunes a Viernes"
          />
        </SimpleGrid>
        <Flex gap={8} mt="40px" flexDirection={{ base: "column", md: "row" }}>
          <DynamicContactForm onSubmit={onSubmit} loader={loader} />
          <ContactMap />
        </Flex>
      </Container>
    </Layout>
  );
};

export default Contacto;

export async function getStaticProps(ctx) {
  const {handlePagesData} = await import(
    "../firebase/api"
  );
  const pages = await handlePagesData();
  return {
    props: {
      pages,
    },
  };
}
