import styles from '../../assets/styles/ProductDescription.module.css'
import { Box, Divider } from "@chakra-ui/react";
import ReactHtmlParser from "react-html-parser";

const ProductHtmlContent = ({ content, divider = false }) => {
  if (content) {
    return (
      <>
        {divider && <Divider m="40px 0"/>}
        <Box className={styles.marginParagraphs} fontSize={{ base: "0.8rem", md: "0.85rem" }} w="100%">
          {ReactHtmlParser(content)}
        </Box>
      </>
    );
  }
};

export default ProductHtmlContent;
