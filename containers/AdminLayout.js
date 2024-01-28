import AdminNavbar from "../components/Admin/AdminNavbar";
import { Container, Box } from "@chakra-ui/react";
import IconButton from "../components/IconButton";
import { AiFillHome } from "react-icons/ai";
import { SiNetlify } from "react-icons/si";
import Link from "next/link";
import PageLoader from "../components/PageLoader";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { FaPlus } from "react-icons/fa";

const AdminLayout = ({ children, pages }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <PageLoader />;
  }
  if (!user) {
    router.push("/login");
    return <PageLoader />;
  }
  return (
    <>
      <AdminNavbar pages={pages} auth={auth} />
      <Box pt="120px" pb='60px' backgroundColor='#fafafa' minHeight='100vh'>
      <Container maxW = {{base:'100%',md:'80vw'}} >{children}</Container>
      <Link href="/admin/addproduct">
        <IconButton
          icon={<FaPlus />}
          size="lg"
          style={{ position: "fixed", bottom: "100px", right: "20px" }}
          label='Añadir producto'
        />
      </Link>
      <Link href="/">
        <IconButton
          icon={<AiFillHome />}
          size="lg"
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
          label='Regresar a inicio'
        />
      </Link>
      <a href="https://app.netlify.com/" target="_blank">
        <IconButton
          icon={<SiNetlify />}
          size="lg"
          style={{ position: "fixed", bottom: "20px", right: "100px" }}
          label='Ir a Netlify'
        />
      </a>
      </Box>

    </>
  );
};

export default AdminLayout;
