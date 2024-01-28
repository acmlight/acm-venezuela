import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { Text, Divider, Heading, Flex, Button } from "@chakra-ui/react";;
import { useState, useEffect } from "react";
import { m } from "framer-motion";
import IconButton from "../IconButton";
import styles from "../../assets/styles/Home.module.css";
import dynamic from "next/dynamic";

const DynamicPortrait = dynamic(() => import("./Portrait"), {
  loading: () => null,
});

const blurData =
  "data:image/jpeg;base64,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PNWJ5OtZF3Lk4FYyjc2hIhlfcSajooqkrFt3CiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA73NLmo80ua9KxzkgNODVEDTgaLCJQacDUQNOBpWJZKDTgaiBpQaViWyXdS5qIGlzU2JuSbqQmmZppNKwrjy1MZqaTTGalYXMDNULtSs1QO1LlDmGyNVSZ6klaqkpzUuI1MrXD9aypTlzWhcHg1nN1NYzVjqpdxKKKKg2CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDuKUGkor1bHOOzTgaYKcKLEseKcDTBSilYljwadmmClpWIbH5ozTaWlYhsXNNJozTSaViGwJqNjSsajY0rEuQ1zVeRqkc1C9FieYhkqtLVh6rS9Kho0gUrk8Gs89av3PQ1QPWsKi0PQpbBRRRWJqFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHbilptOr1znFFKKaKctIljhThTRThSIY6lptOoM2FHaiipIYGmmlNIaCGMaomqVqiakZsheomqVqiagSIXqtL0qy9VpehqGbwKFz3qk3WrtzVJqwq7HoUthKKKK5zUKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/9k=";

const Start = ({ data, colors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === data.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? data.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === data.length ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => {
      // Limpiar el intervalo cuando el componente se desmonte
      clearInterval(interval);
    };
  }, [data.length]);
  return (
    <>
      <Flex
        alignItems="center"
        position="relative"
        minHeight="750px"
        height="100vh"
      >
        <DynamicPortrait
          image={data[currentIndex].img}
          alt={data[currentIndex].title}
          blurData={blurData}
          below="md"
        />
        <DynamicPortrait
          image={data[currentIndex].imgphone}
          alt={data[currentIndex].title}
          blurData={blurData}
          above="md"
        />

        <m.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: 2 }}
          className={styles.container}
        >
          <Heading
            color={colors.primary ? colors.primary : "#838383"}
            fontSize={{ base: "2rem", md: "2.5rem", lg: "2.8rem" }}
            fontWeight="bold"
          >
            {data[currentIndex].title}
          </Heading>
          <Divider w={[280, 380, 480]} className={styles.divider} />
          <Text
            color={colors.secondary ? colors.secondary : "#838383"}
            mb="15px"
            fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.6rem" }}
            fontWeight="medium"
          >
            {data[currentIndex].subtitle}
          </Text>
          <Text
            color={colors.secondary ? colors.secondary : "#838383"}
            mb="10px"
            fontSize={{ base: "1rem", md: "1.2rem", lg: "1.2rem" }}
            fontWeight="regular"
          >
            {data[currentIndex].description}
          </Text>
          {data[currentIndex].calltoaction && (
            <a href={data[currentIndex].calltoaction} target="_blank">
              <Button bg="brand.100" color="white" boxShadow="md">
                Ver
              </Button>
            </a>
          )}
        </m.div>
      </Flex>
      <Flex
        position="absolute"
        top="650px"
        width="100%"
        justifyContent="space-between"
        pr="5%"
        pl="5%"
        color='brand.100'
      >
        <IconButton
          icon={<TiArrowLeftThick />}
          variant="outline"
          handleClick={handlePrevious}
          style={{
            color: colors.primary
          }}
        />
        <IconButton
          icon={<TiArrowRightThick />}
          variant="outline"
          handleClick={handleNext}
          style={{
            color: colors.primary
          }}
        />
      </Flex>
    </>
  );
};

export default Start;
