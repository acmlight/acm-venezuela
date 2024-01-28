import { create } from "zustand";
import { createCartSlice } from "./cart";
import { createProductHistorySlice } from "./productHistory";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProductStore = create(persist((...a) => ({
  ...createCartSlice(...a),
  ...createProductHistorySlice(...a),
}),{
  name:'product-store',
  storage: createJSONStorage(() => sessionStorage)
}));
