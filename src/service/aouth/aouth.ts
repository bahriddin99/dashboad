import { Request } from "../../interface/aouth";
import request from "../config/config";

const auth: Request = {
  sign_up: (data) => request.post("/auth/register", data),
  auth_verify: (data) => request.post("/auth/verify", data),
  sign_in: (data) => request.post("/auth/login", data),
  forget_password: (data) => request.post("/auth/forgot-password", data),
  update_password: (data) => request.post("/auth/verify-forgot-password", data),
  get_services: (data) => request.post("/auth/service/get-all"),
};

export default auth;
