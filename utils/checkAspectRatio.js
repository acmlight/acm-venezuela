//onload se ejecuta cuando luego que uan imagen se ha cargadoo. Es asíncrona y no puede devolver un valor directamente,
//en cambio, debes utilizar técnicas como promesas o callbacks para lograr realizar acciones dependiendo del resultado

export const checkAspectRatio = (uploadedImage,desktop) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;

      if ((aspectRatio < 1 && !desktop) || (aspectRatio > 1 && desktop) || (aspectRatio === 1)) {
        // Cumple con una de las condiciones: vertical y no es para escritorio o horizontal y es para escritorio
        resolve(true);
      } else {
        const message = "Debe subir una imagen en formato adecuado"
        reject(new Error(message))
      }
      //resolve(aspectRatio)
    };
    img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
    }
  });
};

export const checkSquareRatio = (uploadedImage) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = uploadedImage;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;

      if (aspectRatio === 1) {
        resolve(true);
      } else {
        const message = "Debe subir una imagen con el formato adecuado (Ej: 300x300)"
        reject(new Error(message))
      }
      //resolve(aspectRatio)
    };
    img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
    }
  });
}