import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import PageLoader from "../components/PageLoader";


const INITIAL_STATE = {
  mail: "",
  password: "",
};

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [input, setInput] = useState(INITIAL_STATE);
  const toast = useToast();
  const errorToast = {
    status: "error",
    duration: 5000,
    isClosable: true,
  };

  if (loading) {
    return <PageLoader/>
  }
  if (user) {
    router.push("/admin");
    return <PageLoader/>
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    signInWithEmailAndPassword(auth, input.mail, input.password)
      .then((userCredential) => {
        //   onSetAuthUser(userCredential.user.)
        toast({
          title: "Bienvenido",
          description: userCredential.user.email,
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        if (error.message.includes("wrong-password")) {
          toast({
            title: "Contraseña o correo equivocado",
            description: "Por favor, intente nuevamente",
            ...errorToast,
          });
        } else if (error.message.includes("user-not-found")) {
          toast({
            title: "Este usuario no existe",
            description: "Por favor, intente nuevamente",
            ...errorToast,
          });
        } else if (error.message.includes("too-many-requests")) {
          toast({
            title: "Cuenta ha sido deshabilitada temporalmente",
            description:
              "Por múltiples intentos fallidos, la cuenta ha sido deshabilitada. Intente más tarde.",
            ...errorToast,
          });
        } else {
          toast({
            title: "Intente nuevamente",
            ...errorToast,
          });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#fafafa">
      <Container height="100%">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Image
            width={200}
            height={90}
            alt="ACM Logo Blanco"
            src="/acm-logo.png"
            priority={1}
            style={{ marginBottom: "20px" }}
          />
          <Box textAlign="center" mb="40px">
            <Text fontSize="2xl" fontWeight="regular">
              Administración de productos
            </Text>
            <Text>Sólo personal autorizado</Text>
          </Box>
          <form
            style={{ width: "100%" }}
            className="login"
            onSubmit={handleSubmit}
          >
            <Input
              value={input.mail}
              name="mail"
              onChange={handleChange}
              placeholder="Correo"
              mb="20px"
              color="#b0d236"
              _placeholder={{ opacity: 1, color: "inherit" }}
            />
            <InputGroup size="md" mb="20px">
              <Input
                value={input.password}
                onChange={handleChange}
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Contraseña"
                color="#b0d236"
                _placeholder={{ opacity: 1, color: "inherit" }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit">Log In</Button>
          </form>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;
