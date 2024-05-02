import { Request } from "../../interface/aouth";
import request from "../config/config";

const auth: Request = {
  sign_up: (data) => request.post("/auth/register", data),
  auth_verify: (data) => request.post("/auth/verify", data),

};

export default auth;
