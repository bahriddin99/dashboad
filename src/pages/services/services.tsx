import { useEffect, useState } from "react";
import Tables from "../../components/ui/table";
import { getDataFromCookie } from "../../utils/data-service";
import { Button, IconButton, InputBase } from "@mui/material";
import Paper from "@mui/material/Paper";
import ServiceAddModal from "../../components/modal/service/service-add";
import useServeceStore from "../../store/service";
import GlobalPagination from "../../components/ui/pagination";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
const services = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { getData, data, isLoading, deletData, totalCount } = useServeceStore();

  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    owner_id: getDataFromCookie("id"),
  });
  console.log(data);

  useEffect(() => {
    getData(params);
  }, [params, getData]);

  data.forEach((item, index) => {
    if (data.length <= 10) {
      item.index = params.page * params.limit - (params.limit - 1) + index;
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((preveParams) => ({
      ...preveParams,
      page: pageNumber,
    }));
    console.log(page);
  }, [location.search]);

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Xizmat nomi", value: "name" },
    { title: "Xizmat narxi", value: "price" },
    { title: "Action", value: "action" },
  ];

  const editeItem = (item: any) => {
    setModal(true);
    setItem(item);
    // handelClose()
  };

  const handelClose = () => {
    setModal(false);
    setItem({});
  };
  const changePage = (value: number) => {
    setParams((preveParams) => ({
      ...preveParams,
      page: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      {modal && (
        <ServiceAddModal open={modal} handelClose={handelClose} item={item} />
      )}
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          Xizmat qo'shish
        </Button>
      </div>
      <Tables
        headers={headers}
        body={data}
        isLoading={isLoading}
        deleteItem={deletData}
        editeItem={editeItem}
      />
      <GlobalPagination
        totalCount={totalCount}
        page={params.page}
        setParams={changePage}
      />
    </div>
  );
};

export default services;
