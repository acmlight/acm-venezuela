import { useForm } from "react-hook-form";
import { Button, Input, Flex, Center, Spinner, Textarea } from "@chakra-ui/react";

const ContactForm = ({ onSubmit, loader }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <form style={{flex:1}}  onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={4}>
        <Input required {...register("name")} placeholder="Nombre y Apellido" />
        <Flex direction='row' gap={4}>
            <Input  required {...register('phone')} placeholder="Teléfono" />
            <Input type="email" required {...register('mail')} placeholder="Email"/>
        </Flex>
        <Flex direction='row' gap={4}>
            <Input required {...register('specialty')} placeholder="Especialidad Médica" />
            <Input required {...register('city')} placeholder="Ciudad"/>
        </Flex>
        <Textarea required {...register('message')} placeholder="Mensaje"/>
        <Input {...register("sweet")} placeholder="Not for you" type="hidden"/>
        <Center>
        <Button bg="brand.100" color="white" boxShadow="md" type="submit">
          {loader ? <Spinner color="white" size='xs' /> : <>Enviar</>}
        </Button>
      </Center>
      </Flex>
    </form>
  );
};

export default ContactForm;
