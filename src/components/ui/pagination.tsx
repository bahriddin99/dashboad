import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { PaginationProps } from "../../interface/global";

const GlobalPagination = (props: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handelChange = (event: React.ChangeEvent<unknown>, value: number) => {
  props.setParams(value)
  const searchParams = new URLSearchParams(location.search)
  searchParams.set("page",`${value}`)
  navigate(`?${searchParams}`)
  };
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          count={props.totalCount}
          page={props.page}
          onChange={handelChange}
        />
      </Stack>
    </>
  );
};
export default GlobalPagination;
