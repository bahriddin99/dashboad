import request from "../config/config";
import { RequestOrders } from "@orders-interface";


const orders: RequestOrders = {
  get_orders: (params) => request.get("/order/all",{params}),
  create_order:(data)=>request.post("/order",data),
  delet_orders:(id)=>request.delete(`/order?id = ${id}`),
  update_orders: (data) => request.put("/order", data),
  
  
};

export default orders;
