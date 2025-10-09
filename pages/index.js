import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "../assets/styles/Home.module.css";
import About from "../components/Home/About";
import Products from "../components/Home/Products";
import Start from "../components/Home/Start";
import Layout from "../containers/Layout";
import dynamic from "next/dynamic";
import formatDate from "../utils/formatDate";
import SEOHead from "../components/SEOHead";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "../utils/structuredData";

const DynamicTestimonials = dynamic(
  () => import("../components/Home/Testimonials"),
  {
    loading: () => null,
  }
);
const DynamicNews = dynamic(() => import("../components/Home/News"));
const DynamicClients = dynamic(() => import("../components/Home/Clients"));
const DynamicServices = dynamic(() => import("../components/Home/Services"));

export default function Home({
  banners,
  pages,
  news,
  testimonials,
  colors,
  brand,
  brandImages,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, localBusinessSchema]
  };

  const seoTitle = "ACM Venezuela | Equipos Médicos Oftalmológicos y Láseres | Caracas";
  const seoDescription = "Distribuidor líder de equipos oftalmológicos, láseres e insumos médicos en Venezuela. Más de 26 años de experiencia en oftalmología, otorrinolaringología, cirugía, veterinaria y odontología. Tecnología de punta.";
  const keywords = "equipos médicos venezuela, equipos oftalmológicos caracas, láseres médicos venezuela, instrumental oftalmología, cirugía ocular venezuela, ACM Venezuela, equipos otorrinolaringología, equipos veterinaria médica";

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical="/"
        keywords={keywords}
        structuredData={structuredData}
      />
      <div id="top" ref={ref} className={styles.navBarInitPosition}></div>
      <Layout
        atTop={isInView}
        pages={pages}
      >
        <Start data={banners} colors={colors} />
        <About brand={brandImages} />
        <Products pages={pages} />
        <div id="servicios">
          <DynamicServices />
        </div>
        <div id="clientes">
          <DynamicClients />
        </div>
        <div id="testimonios">
          <DynamicTestimonials testimonials={testimonials} />
        </div>
        <DynamicNews news={news} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {
    handleInitialInfoData,
    handlePagesData,
    handleNewsData,
    handleTestimonialsData,
    handleBannnersColorsData,
    handleBrandData,
  } = await import("../firebase/api");
  const [banners, colors, pages, newsData, brand, testimonials] =
    await Promise.all([
      handleInitialInfoData(),
      handleBannnersColorsData(),
      handlePagesData(),
      handleNewsData(),
      handleBrandData(),
      handleTestimonialsData(),
    ]);

  newsData.sort((a, b) => b.uploadedAt - a.uploadedAt);
  const newsWithDate = newsData.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });

  const brandImages = brand.map((item) => item.img);
  testimonials.sort((a, b) => {
    // Verificar si la propiedad uploadedAt existe en ambas instancias
    if (a.uploadedAt && b.uploadedAt) {
      return b.uploadedAt - a.uploadedAt;
    } else {
      // Manejar el caso en que uploadedAt no existe en alguna de las instancias
      console.warn("Al menos una instancia no tiene la propiedad uploadedAt.");
      return 0;
    }
  });
  const testimonialsWithDate = testimonials.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });
  return {
    props: {
      banners,
      pages,
      news: newsWithDate,
      testimonials: testimonialsWithDate,
      colors,
      brand,
      brandImages,
    },
  };
}
