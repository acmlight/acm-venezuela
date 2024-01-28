import { transporter, mailOptions } from "../../utils/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (data.sweet) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!data.name || !data.mail || !data.phone || !data.city) {
      return res.status(400).json({ message: "Bad Request" });
    }
    if (data.equipos.length === 0) {
      return res
        .status(400)
        .json({ message: "No hay equipos en el carrito para enviar" });
    }

    const cuerpo = `
        <h1>Solicitud de cotización por parte de ${data.name} - ACM Venezuela</h1>
        <ul>
            <li>Número de teléfono: ${data.phone}</li>
            <li>Correo de contacto: ${data.mail}</li>
            <li>Ciudad: ${data.city}</li>
        </ul>
        <b>Equipos:</b><p>${data.equipos}</p>
       `;
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `Se ha solicitado una nueva cotización por parte de ${data.name} - Carrito ACM Venezuela`,
        html: cuerpo,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  return res.status(400).json({ message: "Bad Request" });
};

export default handler;


// import { transporter, mailOptions } from "../../utils/nodemailer";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const data = req.body;

//     if (!data.name || !data.mail || !data.phone || !data.city) {
//       return res.status(400).json({ message: "Bad Request" });
//     }
//     if (data.equipos.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No hay equipos en el carrito para enviar" });
//     }

//     const cuerpo = `
//         <h1>Solicitud de cotización por parte de ${data.name}</h1>
//         <ul>
//             <li>Número de teléfono: ${data.phone}</li>
//             <li>Correo de contacto: ${data.mail}</li>
//             <li>Ciudad: ${data.city}</li>
//         </ul>
//         <b>Equipos:</b><p>${data.equipos}</p>
//        `;
//     try {
//       const captchaSecretKey = process.env.CAPTCHA_SECRET_KEY;
//       const captchaResponse = await fetch(
//         "https://www.google.com/recaptcha/api/siteverify",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: `secret=${captchaSecretKey}&response=${data.token}`,
//         }
//       );
//       const apiCaptchaResponse = await captchaResponse.json();
//       if (apiCaptchaResponse?.score > 0.5) {
//         await transporter.sendMail({
//           ...mailOptions,
//           subject: `Se ha solicitado una nueva cotización por parte de ${data.name} - Carrito ACM Venezuela`,
//           html: cuerpo,
//         });

//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(400).json({
//           message: "Google ReCaptcha Failure"
//         });
//       }
//     } catch (error) {

//       return res.status(400).json({ message: error.message });
//     }
//   }
//   return res.status(400).json({ message: "Bad Request" });
// };

// export default handler;
