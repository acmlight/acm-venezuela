export const createProductHistorySlice = (set) => ({
  products: [],
  addToHistory: (item) => {
    if(item){
      set((state) => {
        const history = [...state.products];
        const historyLength = state.products.length;
        //verificar si al menos un elemento se repite. Devuelve true si id es repetido
        const isRepeated = history.some((product) => product.id === item.id);

        if (!isRepeated) {
          if (historyLength < 4) {
            history.push(item);
          } else {
            history.shift(); // Remove the oldest item
            history.push(item);
          }
        }
        return { products: history };
      });
    }
  },
})
