export const getIdFromLink = (link) => {
  const expresionRegular = /\/reel\/([^\/?]+)/;
  const result = link.match(expresionRegular);

  // Verificar si se encontró el ID
  if (result && result.length > 1) {
    let id = result[1];
    return id;
  } else {
    throw new Error("Link no compatible");
  }
};
