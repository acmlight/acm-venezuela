import PageLoader from "../components/PageLoader";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Sidebar from "../components/Admin/Sidebar";
import styles from "./AdminLayout.module.css";

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
    <div className={`${styles.layout}`}>
      <Sidebar pages={pages} auth={auth} />
      <div className={`${styles.main}`}>
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
