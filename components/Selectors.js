import { Select, Divider, Text, Box } from "@chakra-ui/react";

const Selectors = ({
  placeholder,
  options,
  register,
  name,
  onFocus,
  label,
}) => {
  return (
    <>
      <Box>
        <Text color="brand.500" fontWeight="600" fontSize="0.9rem" mb={2}>
          {label}
        </Text>
        <Select
          placeholder={placeholder}
          fontWeight="300"
          fontSize="0.85rem"
          {...register(name)}
          onFocus={(e) => onFocus(e)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </Box>
      <Divider />
    </>
  );
};

export default Selectors;
