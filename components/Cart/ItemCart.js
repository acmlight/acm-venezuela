import {
  Card,
  Text,
  Heading,
  CardBody,
  IconButton as IconButtonChakra,
} from "@chakra-ui/react";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
import { useProductStore } from "../../state";
import useStore from "../../hooks/useStore";

const ItemCart = ({ item }) => {
  const deleteEquipment = useProductStore(state => state.deleteEquipment)

  const deleteProduct = () => {
    deleteEquipment(item)
  }
  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      mb="5px"
      position="relative"
    >
      <Image
        style={{ objectFit: "cover" }}
        width={100}
        height={100}
        src={item.image}
        alt={item.title}
      />

      <CardBody>
        <Heading color="brand.300" size="sm">
          {item.title}
        </Heading>

        <Text noOfLines={[2, 3, 4]} py="2" fontSize="0.8rem">
          {item.description}
        </Text>
        <IconButtonChakra
          onClick={() => deleteProduct()}
          colorScheme="red"
          variant='outline'
          position="absolute"
          bottom="0px"
          right="0px"
          height='25px'
          icon={<BiTrash/>}
        />
      </CardBody>
    </Card>
  );
};

export default ItemCart;
