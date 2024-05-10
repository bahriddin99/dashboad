import request from "../config/config";
import { RequestServis } from "@services-interface";


const servicess: RequestServis = {
  get_services: (params) => request.post("/service/get-all", {params}),
  
};

export default servicess;
