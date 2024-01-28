export const createCartSlice = (set, get) => ({
  equipment: [],
  equipmentCount: 0,
  addEquipment: (item) => {
    if (item) {
      const cart = get();
      set({
        equipment: [...cart.equipment, item],
        equipmentCount: cart.equipment.length + 1,
      });
    }
  },
  deleteEquipment: (item) => {
    if (item) {
      const cart = get();
      set({
        equipment: cart.equipment.filter((product) => product.id !== item.id),
        equipmentCount: cart.equipment.length - 1,
      });
    }
  },
});
