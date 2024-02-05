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

    const cuerpo = `<html>
                      <head>
                        <style>
                          body {
                            font-family: "Arial", sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 30px;
                            padding: 0;
                            border-radius: 10px;
                            box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                              0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
                          }

                          header {
                            background-color: #b0d236;
                            color: #fff;
                            padding: 20px;
                            text-align: center;
                          }

                          section {
                            margin-left: 50px;
                          }
                          h1 {
                            color: #fff;
                          }

                          ul {
                            list-style-type: none;
                            padding: 0;
                          }

                          li {
                            margin-bottom: 10px;
                          }

                          b {
                            color: #72c5cb;
                          }

                          footer {
                            background-color: #b0d236;
                            color: #fff;
                            border-radius: 0 0 10px 10px;
                            text-align: center;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }
                        </style>
                      </head>
                      <body>
                        <header>
                          <h1>Solicitud de cotización por parte de ${
                            data.name
                          } - ACM Venezuela</h1>
                        </header>
                        <section>
                          <ul>
                            <li><b>Número de teléfono: </b> ${data.phone}</li>
                            <li><b>Correo de contacto:</b> ${data.mail}</li>
                            <li><b>Ciudad:</b> ${data.city}</li>
                            <li><b>Municipio:</b> ${data.municipio}</li>
                          </ul>
                          <br>
                          <b>Equipos:</b>
                          <p>${data.equipos}</p>
                        </section>
                        <footer>
                          <p>ACM Venezuela - ${new Date().getFullYear()}</p>
                        </footer>
                      </body>
                    </html>`;

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
