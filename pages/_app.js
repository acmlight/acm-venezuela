import "../assets/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { getAnalytics, logEvent } from "firebase/analytics";
import {analytics} from '../firebase/config'
import { useRouter } from "next/router";
import { useEffect } from "react";
const colors = {
  brand: {
    100: "#b0d236",
    200: "#dcea8c",
    300: "#72c5cb",
    400: "#b5eaea",
    500: "#838384",
    600: "#c6c6c6",
  },
};

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  const router = useRouter();


  //Necesario para captar la navegación por cada ruta de la página para PostHog
  useEffect(() => {
    const handleRouteChange = () => logEvent(analytics, 'page_view',{
      page_location: `${router.basePath}${router.asPath}`,
      page_path: router.asPath,
      page_title: router.asPath
    })
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    // <PostHogProvider client={posthog}>
      <AnimatePresence mode="wait">
        <ChakraProvider theme={theme}>
          <main className={montserrat.className}>
            <LazyMotion features={domAnimation}>
              <Component {...pageProps} />
            </LazyMotion>
          </main>
        </ChakraProvider>
      </AnimatePresence>
    // </PostHogProvider>
  );
}

export default MyApp;
