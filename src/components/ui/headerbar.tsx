import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import AccountMenu from "./accountmenu";
// import SearchBar from "./search";


const drawerWidth = 240;
interface ModalProps {
    handleDrawerToggle:()=>void
}

const Headerbar = ({handleDrawerToggle}:ModalProps) => {
    
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between items-center w-full">
          <Typography variant="h6" noWrap component="div">
            Bahriddin Shavqiyev
          </Typography>
          {/* <SearchBar/> */}
          <AccountMenu/>
          </div>
        </Toolbar>
      </AppBar>
  
    </div>
  );
};

export default Headerbar;
