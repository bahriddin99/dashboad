import { useEffect, useState } from "react";
import Tables from "../../components/ui/table";
import { Button } from "@mui/material";
import useOrdersStore from "../../store/orders";
import { ToastContainer } from "react-toastify";
import OrdersAddModal from "../../components/modal/orders/orders-add";
import GlobalPagination from "../../components/ui/pagination";
import { Search } from "../../components/ui/search";
const Orders = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const { getData, data, isLoading, totalCount, deletData } = useOrdersStore();
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    name:""
  });

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
    const input_val = params.get("search");
    const find = input_val ? input_val : ""
    const pageNumber = page ? parseInt(page) : 1;
    setParams((preveParams) => ({
      ...preveParams,
      page: pageNumber,
      name:find
    }));
    
  }, [location.search]);

  const headers = [
    { title: "T/R", value: "index" },
    { title: "Client id", value: "client_id" },
    { title: " Client name", value: "client_name" },
    { title: "Price", value: "price" },
    { title: "Amount", value: "amount" },
    { title: "Status", value: "status" },
    { title: "Date", value: "created_at" },
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
        <OrdersAddModal open={modal} handelClose={handelClose} item={item} />
      )}
      <div className="py-3 flex justify-between items-center ">
        <Search />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          Buyurtma qo'shish
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

export default Orders;
