import { auth } from "../../firebase/config";
import AdminLayout from "../../containers/AdminLayout";
import { SimpleGrid } from "@chakra-ui/react";
import AdminNews from "../../components/Admin/General/AdminNews";
import formatDate from "../../utils/formatDate";
import { submitNews } from "../../utils/adminForms";

const Admin = ({ pages, newsWithDate }) => {
  return (
    <>
      <AdminLayout pages={pages} auth={auth}>
        <SimpleGrid columns={2} spacing={8}>
          {newsWithDate.map((item) => (
            <AdminNews key={item.title} onSubmit={submitNews} {...item} />
          ))}
        </SimpleGrid>
      </AdminLayout>
    </>
  );
};

export default Admin;

export async function getServerSideProps({ locale }) {
  const { handlePagesData, handleNewsData } = await import(
    "../../firebase/api"
  );

  const [pagesData, newsData] = await Promise.all([
    handlePagesData(),
    handleNewsData(),
  ]);

  newsData.sort((a, b) => b.uploadedAt - a.uploadedAt);
  const newsWithDate = newsData.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });

  return {
    props: {
      pages: pagesData,
      newsWithDate,
    },
  };
}
