// import { DashboardCustomizeRoundedIcon, DryCleaning } from "@mui/icons-material"

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SettingsIcon from '@mui/icons-material/Settings';
import EventNoteIcon from '@mui/icons-material/EventNote';
interface  Route {
    path: string;
    content:string;
    icon:React.ReactElement
}

const routers:Route[] = [
    {
        path :"/main",
        content: "Asosiy",
        icon: <DashboardCustomizeIcon/>
    },
    {
        path :"/main/orders",
        content: "Buyurtmalar",
        icon: <DryCleaningIcon/>
    },
    {
        path :"/main/cilenet",
        content: "Mijozlar",
        icon: <PersonOutlineIcon/>
    },
    {
        path :"/main/maarketing",
        content: "SMS marketing",
        icon: <EventNoteIcon/>
    },
    {
        path :"/main/services",
        content: "Xizmatlar",
        icon: <DesignServicesIcon/>
    },
    {
        path :"/main/setting",
        content: "Sozlamalar",
        icon: <SettingsIcon/>
    },
]

export default routers