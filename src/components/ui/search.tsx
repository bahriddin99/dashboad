import { IconButton, InputBase, Paper } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

export const Search = () => {
    const [value,setValue] = useState("")
    const navigate  = useNavigate()
    const location = useLocation()
    const handleChange = (event: any) => {
        const search = event.target.value;
        // console.log(search);
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("search", search)
        navigate(`?${searchParams}`)
      };

useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const input_val = params.get("search")
    const search = input_val ? input_val: ""
    setValue(search)
    console.log(search, "baxa");
    
},[location.search])
  return (
    <div>
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
              onChange={handleChange}
              value={value}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
    </div>
  )
}
