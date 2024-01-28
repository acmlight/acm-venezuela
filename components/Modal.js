import {
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  scrollBehavior = "outside",
  footer = false,
  isCentered = false
}) => {
  return (
    <>
      <ModalChakra
        size="lg"
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={isCentered}
      >
        <ModalOverlay />
        <ModalContent w="95%" p="10px 2px">
          <ModalHeader fontSize={{ base: "md", md: "xl" }}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={{ base: "0.8rem", md: "1rem" }}>
            {children}
          </ModalBody>

          {footer && (
            <ModalFooter flexDirection={{ base: "column", md: "row" }} gap={3}>
              {footer}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalChakra>
    </>
  );
};

export default Modal;
