import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "../assets/styles/Home.module.css";
import About from "../components/Home/About";
import Products from "../components/Home/Products";
import Start from "../components/Home/Start";
import Layout from "../containers/Layout";
import dynamic from "next/dynamic";
import formatDate from "../utils/formatDate";

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

  return (
    <>
      <div id="top" ref={ref} className={styles.navBarInitPosition}></div>
      <Layout
        atTop={isInView}
        pages={pages}
        title="ACM Venezuela - Inicio"
        description="ACM Venezuela es una empresa con más de 20 años de experiencia al servicio, comercialización y distribución de equipos, láseres e insumos Oftalmológicos con repercusión en Otorrinolaringología y Cirugía."
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

export async function getStaticProps(ctx) {
  const {
    handleInitialInfoData,
    handlePagesData,
    handleNewsData,
    handleTestimonialsData,
    handleBannnersColorsData,
    handleBrandData,
  } = await import("../firebase/api");
  const banners = await handleInitialInfoData();
  const colors = await handleBannnersColorsData();
  const pages = await handlePagesData();
  const newsData = await handleNewsData();
  const brand = await handleBrandData();
  newsData.sort((a, b) => b.uploadedAt - a.uploadedAt);
  const newsWithDate = newsData.map((item) => {
    const date = formatDate(item.uploadedAt);
    return {
      ...item,
      uploadedAt: date,
    };
  });

  const brandImages = brand.map((item) => item.img);
  const testimonials = await handleTestimonialsData();
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
