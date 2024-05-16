import request from "../config/config";
import { RequestServis } from "@services-interface";


const servicess: RequestServis = {
  get_services: (params) => request.get("/service/all",{params}),
  get_delet: (id) => request.delete(`/service?id=${id}`),
  create_service: (data) => request.post("/service", data),
  update_service: (data) => request.put("/service", data),
  
  
};

export default servicess;
