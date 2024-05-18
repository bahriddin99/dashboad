import { create } from "zustand";
import { OrdersStore } from "@orders-interface";
import { orders } from "../service";
const useOrdersStore = create<OrdersStore>((set) => ({
  isLoading: false,
  data: [],
  totalCount: 1,

  getData: async (params) => {
    try {
      set({ isLoading: true });
      const respons = await orders.get_orders(params);
      console.log(respons);
      if (respons.status === 200) {
        set({
          totalCount: Math.ceil((respons.data.total / params.limit)),
          data: respons?.data?.orders_list
  
         })
        set({ data: respons?.data?.orders_list });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      //   set({isLoader: false})
    }
  },

  createData: async (data) => {
    try {
      const respons = await orders.create_order(data);
      if (respons.status === 201) {
        set((state) => ({ data: state.data.length<10? [...state.data, respons.data] : [...state.data] }));
        return respons.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
  deletData: async (id) => {
    try {
      const response = await orders.delet_orders(id);
      if (response.status === 200) {
        set((state) => ({ data: state.data.filter((item) => item.id !== id) }));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  updateData: async (data) => {
    try {
      const response = await orders.update_orders(data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },


}));

export default useOrdersStore;
