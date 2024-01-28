import { AspectRatio, Card, CardBody } from "@chakra-ui/react";
const ContactMap = () => {
  return (
    <Card shadow='xl' flex={1} w='100%' h='100%' borderRadius='8px'>


    <AspectRatio w='100%' ratio={1.65}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.6819561575717!2d-66.87331762478742!3d10.446792665187044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2af776eee82d61%3A0x4ce4a40e80b2322b!2sTerras%20Plaza!5e0!3m2!1ses-419!2ses!4v1693823195049!5m2!1ses-419!2ses"
        width="560"
        height="560"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </AspectRatio>

    </Card>
  );
};

export default ContactMap;
