import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { Signin, Signup } from "../pages";

const router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/main/*" element = {<MainLayout/>}>

        </Route> */}
      </Route>
    )
  );
  return <RouterProvider router={router}/>
};
export default router
