import { create } from "zustand";
import { ServiceStore } from "@services-interface";
import { servicess } from "../service";

const useServeceStore = create<ServiceStore>((set) => ({
  isLoading: false,
  data: [],
  totalCount:1,

  getData: async (params) => {
    try {
      set({ isLoading: true });
      const respons = await servicess.get_services(params);
      console.log(respons);
      if (respons.status === 200) {
        set({
          totalCount: Math.ceil((respons.data.total / params.limit)),
          data: respons?.data?.orders_list
  
         })
        set({ data: respons?.data?.services });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      //   set({isLoader: false})
    }
  },

  createData: async (data) => {
    try {
      const response = await servicess.create_service(data);
      if (response.status === 201) {
        set((state) => ({ data: [...state.data, response.data] }));
        return response.status;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  deletData: async (id) => {
    try {
      const response = await servicess.get_delet(id);
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
      const response = await servicess.update_service(data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useServeceStore;
