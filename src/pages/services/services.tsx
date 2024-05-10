import { useEffect, useState } from "react";
// import Tables from "../../components/ui/table";
// import { servicess } from "../../service";
import { getDataFromCookie } from "../../utils/data-service";
import { Button, IconButton, InputBase } from "@mui/material";
import Paper from '@mui/material/Paper';
import useServerCreate from "../../store/store";

import SearchIcon from "@mui/icons-material/Search";
const services = () => {
  const {getData} = useServerCreate()
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, SetParams] = useState({
    limit: 10,
    page: 1,
    owner_email: getDataFromCookie("email"),
  });
  // const getData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await servicess.get_services(params);
  //     res.data.servicess.array.forEach((item: any, index: number) => {
  //       item.index = index + 1;
  //     });
  //     setData(res?.data?.services);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setIsLoading(false);
  // };
  useEffect(() => {
    getData(params);
  }, [params,getData]);

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Xizmat nomi", value: "name" },
    { title: "Xizmat narxi", value: "price" },
    { title: "", value: "action" },
  ];

  return (
    <div>
      <div className="py-3 flex justify-between items-center ">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Qidiruv"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Button variant="contained" color="primary">Xizmat qo'shish</Button>
      </div>
      {/* <Tables headers={headers} body={data} isLoading={isLoading} /> */}
    </div>
  );
};

export default services;
