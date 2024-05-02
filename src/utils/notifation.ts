import { Bounce, TypeOptions, toast } from "react-toastify"
import  "react-toastify/dist/ReactToastify.css"
 
interface NotifationProp {
    title:string,
    type: TypeOptions | undefined
}
const Notifation = (prop:NotifationProp)=>{
    return toast(prop.title,{
        position: "top-right",
        autoClose:3000,
        hideProgressBar:false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        type:prop.type

    });
}

export default Notifation