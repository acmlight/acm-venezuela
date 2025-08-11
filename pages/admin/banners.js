import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";
import Banners from "../../components/Admin/General/Banners";
import { SimpleGrid } from "@chakra-ui/react";

import { submitBanners } from "../../utils/adminForms";
import BannerColors from "../../components/Admin/General/BannerColors";

const Admin = ({
  pages,
  banners,
  colors,
}) => {
  return (
    <>
      <AdminLayout pages={pages} auth={auth}>
        <BannerColors primary={colors.primary} secondary={colors.secondary} />
        <SimpleGrid columns={2} spacing={8} mt={8}>
          {banners.map((banner) => (
            <Banners key={banner.title} onSubmit={submitBanners} {...banner} />
          ))}
        </SimpleGrid>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps() {
  const { handleInitialInfoData, handlePagesData, handleBannnersColorsData } =
    await import("../../firebase/api");

  const [bannersData, pagesData, colors] = await Promise.all([
    handleInitialInfoData(),
    handlePagesData(),
    handleBannnersColorsData(),
  ]);



  return {
    props: {
      banners: bannersData,
      colors,
      pages: pagesData,
    },
  };
}
