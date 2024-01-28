import {
  IconButton as IconButtonChakra,
  Tooltip,
  Box,
  Text,
} from "@chakra-ui/react";
import { useProductStore } from "../state";
import useStore from "../hooks/useStore";

const IconButton = ({
  icon,
  label,
  variant,
  handleClick,
  size = "md",
  cart = false,
  style = {},
}) => {

  const equipmentCount = useStore(useProductStore,state => state.equipmentCount)

  if (cart) {
    return (
      <Box position="relative">
        <Box
          position="absolute"
          top="-5px"
          right="-5px"
          bg="red"
          w="20px"
          h="20px"
          borderRadius="50%"
          zIndex={2}
          fontWeight="700"
          fontSize="0.7rem"
          color="white"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{equipmentCount}</Text>
        </Box>
        <IconButtonChakra
          onClick={() => handleClick()}
          size={size}
          variant={variant}
          bg={variant ? null : "brand.100"}
          color="white"
          boxShadow="md"
          isRound={true}
          icon={icon}
        />
      </Box>
    );
  }

  return (
    <Tooltip label={label}>
      {handleClick ? (
        <IconButtonChakra
          onClick={() => handleClick()}
          size={size}
          variant={variant}
          bg={variant ? null : "brand.100"}
          color="white"
          boxShadow="md"
          isRound={true}
          icon={icon}
          sx={style}
        />
      ) : (
        <IconButtonChakra
          variant={variant}
          size={size}
          bg={variant ? null : "brand.100"}
          color="white"
          boxShadow="md"
          isRound={true}
          icon={icon}
          sx={style}
        />
      )}
    </Tooltip>
  );
};

export default IconButton;
