import { Input, InputGroup, Box, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import {
  checkAspectRatio,
  checkSquareRatio,
} from "../../utils/checkAspectRatio";

const InputImage = ({
  img,
  register,
  id,
  options = {},
  desktop = false,
  maxSize,
  isSquare = false,
}) => {
  const [imageUpload, setImageUpload] = useState(null);
  const toast = useToast();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Aquí se realizan las validaciones necesarias para la imagen
      // Crear una URL para la nueva imagen seleccionada
      const imageUrl = URL.createObjectURL(file);
      const imageSize = file.size;

      try {
        if (imageSize <= maxSize) {
          setImageUpload(imageUrl);
        } else {
          throw new Error("La imagen es muy pesada para ser subida");
        }
        if (isSquare) {
          await checkSquareRatio(imageUrl);
        } else {
          await checkAspectRatio(imageUrl, desktop);
        }
      } catch (e) {
        event.target.value = null;
        setImageUpload(null);
        toast({
          description: e.message,
          status: "error",
          duration: 3000,
        });
        console.error(e.message);
      }
    }
  };
  return (
    <InputGroup size="md">
      {(img || imageUpload) && (
        <Box w="50px" h="50px" position="relative" mr={3}>
          <Image
            style={{
              objectFit: "contain",
              backgroundPosition: "center",
            }}
            fill
            sizes="(max-width: 1200px) 33vw"
            quality={30}
            src={imageUpload || img}
            alt={id}
          />
        </Box>
      )}

      <Input
        id="imageFile"
        type="file"
        pr="4.5rem"
        fontSize="xs"
        p={2}
        {...register(id, options)}
        onChange={handleImageChange}
      />
    </InputGroup>
  );
};

export default InputImage;
