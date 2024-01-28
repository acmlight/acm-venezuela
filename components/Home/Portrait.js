import { Hide } from "@chakra-ui/react";
import Image from "next/image";

const Portrait = ({
  image,
  title,
  blurData,
  below = null,
  above = null,
}) => {
  return (
    <Hide below={below} above={above}>
      <Image
        priority
        src={image}
        alt={title}
        fill
        style={{ zIndex: -1, objectFit: "cover" }}
        placeholder="blur"
        blurDataURL={blurData}
      />
    </Hide>
  );
};

export default Portrait;
