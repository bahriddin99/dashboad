import {create} from "zustand"
import { servicess } from "../service";
import { ServiceStore } from "@services-interface";
const useServerCreate = create<ServiceStore>(()=>({
    data:[],
    getData:async(params)=>{
        try {
            const response = await servicess.get_services(params)
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }


}))

export default useServerCreate