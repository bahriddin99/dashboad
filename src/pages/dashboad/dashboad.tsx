import { useEffect, useState } from "react";
import { dashboad } from "../../service";
import DashboadDateTimePicker from "../../components/modal/dashboad/dashboad";
import { getDataFromCookie } from "../../utils/data-service";
import Chart from "../../components/ui/chart";
// import { date, date } from "yup";

const Dashboad = () => {
  const date = new Date()
  const [data, setData ] = useState([])
  const end = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  console.log(end);
  
  const [params, setParams] = useState({
    start: getDataFromCookie("start") || "",
    end: end,
  });

  const changeParams = (start: string, end: string) => {
    setParams((prevState) => ({
      ...prevState,
      start: start,
      end: end,
    }));
  };
const getOrders = async()=>{
  const response =  await dashboad.get_dashboad(params)
  const arr = []
  for(const key in response?.data){
  arr.push({label:key, value: response?.data[key]})
 
  
}
setData(arr)
 
};
  useEffect(() => {
  getOrders()
   
}, [params,getOrders]);

  return (
    <div>
      <DashboadDateTimePicker changeParams={changeParams} />
      <Chart data={data}/>
    </div>
  );
}
export default Dashboad
