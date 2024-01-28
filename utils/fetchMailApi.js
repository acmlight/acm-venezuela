export const sendCotizacionForm = async (data) =>
  fetch("/api/cotizacion", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(async (res) => {
    const parsedData = await res.json();
    if (!res.ok) throw new Error(parsedData.message);
    return parsedData;
  });

export const sendContactForm = async (data) =>
  fetch("/api/contacto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(async (res) => {
    const parsedData = await res.json();
    if (!res.ok) throw new Error(parsedData.message);
    return parsedData;
  });
