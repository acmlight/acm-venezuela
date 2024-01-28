import { Flex, Button, Center } from "@chakra-ui/react";
import { m } from "framer-motion";
import Image from "next/image";
import IconButton from "../IconButton";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { AiOutlineShoppingCart, AiFillFilePdf } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProductAssets = ({
  images,
  title,
  datasheet,
  addProduct,
  secondarydatasheet,
  goBack
}) => {
  const [imageButton, setImageButton] = useState(
    images.length > 1 ? true : false
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicRoute = useRouter().asPath;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  //Al cambiar entre las rutas productos/[catalog]/[id] el estado de currentIndex no se inicializa a 0
  //Con este hook nos aseguramos que siempre que dynamicRoute cambie, el index para las imagenes va a empezar en 0
  useEffect(() => {
    setCurrentIndex(0);
  }, [dynamicRoute]);

  //Con este hook nos aseguramos de inicializar correctamente el estado de imageButton si el array de images cambia
  useEffect(() => {
    const moreThanOneImage = images.length > 1 ? true : false;
    setImageButton(moreThanOneImage);
  }, [images]);


  return (
    <>
      <Flex alignItems="center" justifyContent="center" gap={3}>
        <m.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "relative",
            width: "300px",
            height: "300px",
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={title}
            fill
            style={{
              objectFit: "cover",
              flex: 3,
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "4px solid transparent",
              backgroundPosition: "center",
            }}
          />
        </m.div>
      </Flex>
      <Flex direction="column" gap={6} mt={8}>
        <Flex justifyContent="space-around" alignItems="center">
          {imageButton && (
            <IconButton
              flex={1}
              icon={<TiArrowLeftThick />}
              handleClick={handlePrevious}
            />
          )}
          {imageButton && (
            <IconButton
              flex={1}
              icon={<TiArrowRightThick />}
              handleClick={handleNext}
            />
          )}
        </Flex>
        <Flex gap={6} justifyContent="center" flexWrap="wrap">
          <Button
            leftIcon={<AiOutlineShoppingCart />}
            variant="outline"
            color="brand.100"
            onClick={() => addProduct()}
          >
            Añadir al carrito
          </Button>
          {datasheet && (
            <a href={datasheet} target="_blank">
              <Button
                leftIcon={<AiFillFilePdf />}
                variant="outline"
                color="brand.100"
                w={130}
              >
                Folleto
              </Button>
            </a>
          )}
          {secondarydatasheet && (
            <a href={secondarydatasheet} target="_blank">
              <Button
                leftIcon={<AiFillFilePdf />}
                variant="outline"
                color="brand.100"
                w={130}
              >
                Folleto 2
              </Button>
            </a>
          )}
        </Flex>
        <Center>
        <Button
            leftIcon={<IoArrowBackCircle />}
            w='auto'
            variant="outline"
            color="brand.100"
            onClick={() => goBack()}
          >
            Regresar al catálogos
        </Button>
        </Center>

      </Flex>
    </>
  );
};

export default ProductAssets;
