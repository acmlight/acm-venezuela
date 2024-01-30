function generarCaracteresAleatorios(longitud) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indiceAleatorio);
  }

  return resultado;
}

export function generateImgId() {
  // Obtener la fecha actual
  const fecha = new Date();

  // Obtener componentes de la fecha
  const año = fecha.getFullYear().toString().slice(-2);
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getDate().toString().padStart(2, "0");

  // Generar dos caracteres aleatorios
  const caracteresAleatorios = generarCaracteresAleatorios(3);

  // Construir el ID combinando componentes
  const id = año + mes + dia + '-' + caracteresAleatorios + '_';

  return id;
}
