import {
  CardBody,
  Card,
  Stack,
  Heading,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { productBlur } from "../../../assets/blurData";
import Link from "next/link";
import DeleteModal from '../DeleteModal'
import { deleteProduct } from "../../../firebase/delete";
import { useState } from "react";

const AdminProductCard = ({
  title,
  img = "/imagenotfound.png",
  brand,
  link,
  id,
  catalog
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loader, setLoader] = useState(false);

  const onDeleteProduct = async () => {
    try {
      setLoader(true);
      await deleteProduct(catalog, id);
      toast({
        description: "Producto eliminado correctamente",
        status: "success",
        duration: 3000,
      });
      onClose();
      setLoader(false);
    } catch (e) {
      toast({
        description: e.message,
        status: "error",
        duration: 3000,
      });
      onClose();
      setLoader(false);
    }
  };
  return (
    <>
      <DeleteModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        loader={loader}
        onDelete={onDeleteProduct}
      />

      <Card
        w={{ base: "140px", md: "200px" }}
        minH={{ base: "180px", md: "220px" }}
        shadow="md"
        sx={{ cursor: "pointer" }}
      >
        <CardBody p={0} position="relative">
          <Stack position="relative" w="100%" h={{ base: "80px", md: "120px" }}>
            <Image
              src={img}
              alt={title}
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
              style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              placeholder="blur"
              blurDataURL={productBlur}
              quality={40}
            />
            {brand && (
              <Box position="absolute" bottom="10px" right="10px" w={7} h={7}>
                <Image
                  src={brand.img}
                  alt="Logo Fabricante partner de ACM"
                  fill
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              </Box>
            )}
          </Stack>

          <Stack
            spacing="3"
            height="100px"
            p={2.5}
            justifyContent="space-between"
            position="relative"
          >
            <Heading
              fontSize={{ base: "0.8rem", md: "0.9rem" }}
              color="brand.100"
              fontWeight={{ base: "600" }}
              size="md"
              textAlign="center"
            >
              {title}
            </Heading>
            <Stack direction="row" justifyContent="space-between">
              <Link href={link}>
                <Button bg="brand.100" color="white" boxShadow="md" size="xs">
                  Editar
                </Button>
              </Link>
              <Button
                size="xs"
                variant="outline"
                colorScheme="red"
                onClick={() => onOpen()}
              >
                Borrar
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default AdminProductCard;
