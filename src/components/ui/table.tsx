import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { TableProps } from "../../interface/global";
import Dele from "../../assets/imgs/dele";
import Item from "../../assets/imgs/item";
import { ToastContainer } from "react-toastify";

const Tables = (props: TableProps) => {

  return (
    <>
    <ToastContainer />
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            size="medium"
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                {props.headers?.map((header, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{header.title}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : props.body?.map((item, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((header, i) => (
                        <TableCell
                          key={i}
                          className={item[header.value]?.class}
                        >
                          {header.value === "action" ? (
                            <div className="flex gap-3 cursor-pointer items-center">
                              <div onClick={() => props.deleteItem(item.id)} >
                                <Dele/>
                              </div>

                             <div onClick={() => props.editeItem(item)} >
                             <Item/>
                             </div>
                            </div>
                          ) : header.value === "index" ? (
                            index + 1
                          ) : (
                            item[header.value]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  </>
  );
};

export default Tables;
