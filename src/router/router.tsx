import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Clilents, Dashboad, MainLayout, Marketing, Orders, Services, Signin, Signup } from "../pages";
import Settings from "../pages/settings/settings";

const router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main/*" element = {<MainLayout/>}>
        <Route index element={<Dashboad/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="cilenet" element={<Clilents/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="setting" element={<Settings/>}/>
        <Route path="marketing" element={<Marketing/>}/>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router}/>
};
export default router
