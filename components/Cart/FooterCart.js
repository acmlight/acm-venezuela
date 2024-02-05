import { Button, Input, Flex, Center, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const FooterCart = ({ onSubmit, loader }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Flex mb={2} gap={2} flexDirection={{ base: "row", md: "column" }}>
        <Input
          required
          {...register("name")}
          placeholder="Nombre y Apellido"
          size="xs"
        />
        <Input
          type="email"
          required
          {...register("mail")}
          placeholder="Correo"
          size="xs"
        />
      </Flex>
      <Flex mb={2} gap={2} flexDirection={{ base: "row", md: "column" }}>
        <Input
          required
          {...register("phone")}
          placeholder="Número de contacto"
          size="xs"
        />
        <Input required {...register("city")} placeholder="Ciudad" size="xs" />
        <Input {...register("municipio")} placeholder="Municipio" size="xs" />
        <Input {...register("sweet")} placeholder="Not for you" type="hidden"/>
      </Flex>
      <Center>
        <Button bg="brand.100" color="white" boxShadow="md" type="submit">
          {loader ? <Spinner color="white" size='xs' /> : <>Enviar</>}
        </Button>
      </Center>
    </form>
  );
};

export default FooterCart;
