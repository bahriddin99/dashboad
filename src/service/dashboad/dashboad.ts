import request from "../config/config";
import { RequestDashboad } from "@dashboad-interface";


const dashboad: RequestDashboad = {
  get_dashboad: (data)=> request.get(`https://app.olimjanov.uz/v1/orders?start=${data.start}&end=${data.end}`)
  
  
  
};

export default dashboad;
