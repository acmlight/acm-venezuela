// import { transporter, mailOptions } from "../../utils/nodemailer";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const data = req.body;

//     if (
//       !data.name ||
//       !data.phone ||
//       !data.mail ||
//       !data.specialty ||
//       !data.city ||
//       !data.message
//     ) {
//       return res.status(400).json({ message: "Bad Request" });
//     }

//     const cuerpo = `
//         <h1>Nuevo mensaje de ${data.name} - Formulario ACM Venezuela</h1>
//         <h3>Datos de contacto:</h3>
//         <br>
//         <ul>
//             <li>Nombre: ${data.name}</li>
//             <li>Teléfono: ${data.phone}</li>
//             <li>Correo: ${data.mail}</li>
//             <li>Especialidad Médica: ${data.specialty}</li>
//             <li>Ciudad: ${data.city}</li>
//         </ul>
//         <br>
//         <p>${data.message}</p>
//     `;
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
//           subject: `Ha recibido un nuevo mensaje de ${data.name}`,
//           html: cuerpo,
//         });
//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(400).json({
//           message: "Google ReCaptcha Failure",
//         });
//       }
//     } catch (e) {
//       return res.status(400).json({ message: e.message });
//     }
//   }
//   return res.status(400).json({ message: "Bad Request" });
// };

// export default handler

import { transporter, mailOptions } from "../../utils/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (data.sweet) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (
      !data.name ||
      !data.phone ||
      !data.mail ||
      !data.specialty ||
      !data.city ||
      !data.message
    ) {
      return res.status(400).json({ message: "Bad Request" });
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
                          h1, h3 {
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
                          <h1>Nuevo mensaje de ${data.name} - Formulario ACM Venezuela</h1>
                          <h3>Datos de contacto:</h3>
                        </header>
                        <section>
                        <ul>
                          <li>Nombre: ${data.name}</li>
                          <li>Teléfono: ${data.phone}</li>
                          <li>Correo: ${data.mail}</li>
                          <li>Especialidad Médica: ${data.specialty}</li>
                          <li>Ciudad: ${data.city}</li>
                        </ul>
                        </section>
                        <footer>
                          <p>ACM Venezuela - ${new Date().getFullYear()}</p>
                        </footer>
                      </body>
                    </html>`;
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `Ha recibido un nuevo mensaje de ${data.name} - Formulario ACM Venezuela`,
        html: cuerpo,
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
  return res.status(400).json({ message: "Bad Request" });
};

export default handler;
