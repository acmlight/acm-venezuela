import {
  Box,
  Heading,
  Flex,
  useDisclosure,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import Image from "next/image";
import { serviciosBlur } from "../../assets/blurData";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Modal from "../Modal";

const ImageServices = ({ img, title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        {children}
      </Modal>
      <Box
        height="250px"
        w={{ base: "95%", md: "420px" }}
        position="relative"
        shadow="lg"
        role="group"
        onClick={onOpen}
      >
        <Image
          fill
          src={img}
          alt={title}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          placeholder="blur"
          blurDataURL={serviciosBlur}
        />
        <Flex
          position="absolute"
          bottom="15px"
          left="20px"
          color="white"
          _groupHover={{ color: "brand.100" }}
          size={{ base: "md", md: "xl" }}
          alignItems="center"
          gap={3}
          style={{ transition: "all 450ms" }}
        >
          <AiFillInfoCircle size="2.4rem" />
          <Heading as="h2" fontWeight="700">
            {title}
          </Heading>
        </Flex>
      </Box>
    </>
  );
};

const Services = () => {
  return (
    <Box
      bgColor="white"
      minHeight={{ base: "", md: "700px" }}
      height={{ base: "auto", md: "95vh" }}
      p={{ base: "40px 0", md: "0px" }}
    >
      <Flex
        height="100%"
        alignItems="center"
        overflow="hidden"
        direction={{ base: "column", md: "row" }}
      >
        <m.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.25,
          }}
          viewport={{ once: true }}
        >
          <Flex
            alignItems={{ base: "center", md: "end" }}
            justifyContent="center"
            height={{ base: "300px", md: "820px" }}
            flexDirection="column"
            p={{ base: "0 30px", md: "0" }}
            width={{ base: "550px", lg: "820px" }}
            borderRadius="50%"
            bg="brand.300"
            transform={{ base: "translateY(-30%)", md: "translateX(-30%)" }}
          >
            <Flex
              direction="column"
              m={{ base: "70px 0 0 0", md: "0 17%" }}
              alignItems="center"
            >
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl" }}
                color="white"
                textAlign="center"
                mb={{ base: "5px", md: "15px" }}
              >
                Servicios
              </Heading>
              <Heading
                as="h3"
                size={{ base: "xs", md: "lg" }}
                color="white"
                fontWeight="300"
                marginBottom={{ base: "25px", md: "50px" }}
              >
                ACM te acompaña
              </Heading>
            </Flex>
          </Flex>
        </m.div>

        <Flex
          width={{ base: "100%", md: "50%" }}
          p={{ base: "0 20px", md: "0 4% 0 0" }}
          direction="column"
          alignItems="center"
          gap={6}
        >
          <ImageServices img="/servicio-tecnico.jpg" title="Servicio Técnico">
            <Text>
              El objetivo es proporcionar constantemente respaldo a nuestros
              clientes por medio de la capacitación técnica y clínica en
              nuestros productos y equipos de parte de nuestro personal
              calificado. Nuestro servicio contempla:
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Entrenamiento del personal médico, enfermeras y personal de
                salud en el uso seguro y efectivo de nuestros productos y
                equipos.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Capacitación y educación a enfermeras instrumentistas sobre
                técnicas quirúrgicas asociadas con nuestros productos y equipos.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Apoyo en la habilitación de las aplicaciones clínicas y técnicas
                de equipos en el área quirúrgica.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Asesoramiento en nuevas tecnologías y técnicas.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Soporte en el manejo de equipos diagnósticos y configuración de
                parámetros.
              </ListItem>
            </List>
          </ImageServices>
          <ImageServices img="/soporte-clinico.jpg" title="Soporte Clínico">
            <Text>
              El objetivo es proporcionar constantemente respaldo a nuestros
              clientes por medio de la capacitación técnica y clínica en
              nuestros productos y equipos de parte de nuestro personal
              calificado. Nuestro servicio contempla:
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Entrenamiento del personal médico, enfermeras y personal de
                salud en el uso seguro y efectivo de nuestros productos y
                equipos.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Capacitación y educación a enfermeras instrumentistas sobre
                técnicas quirúrgicas asociadas con nuestros productos y equipos.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Apoyo en la habilitación de las aplicaciones clínicas y técnicas
                de equipos en el área quirúrgica.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Asesoramiento en nuevas tecnologías y técnicas.
              </ListItem>
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="brand.200" />
                Soporte en el manejo de equipos diagnósticos y configuración de
                parámetros.
              </ListItem>
            </List>
          </ImageServices>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Services;
