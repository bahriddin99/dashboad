import * as Yup from "yup";

export const singnUpvalidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalit email").required("Email is require"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Passpord must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is requered"),
});
export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalit email").required("Email is require"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Passpord must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
 
});
export const verifyPassValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalit email").required("Email is require"),
 
});
export const updatePassValidationSchema = Yup.object().shape({
  
  new_password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Passpord must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
    code: Yup.string().required()
 
});
export const serviceValidationSchema = Yup.object().shape({
  name: Yup.string().required(" name is required"),
  price: Yup.string().required("price is required"),
 
});

// <<<<<<<<<<<<   ORDERS   >>>>>>>>>>>>>>>>>>>>>>
export const ordersValidationSchema = Yup.object().shape({
  client_full_name: Yup.string().required(" Client full name is required"),
  client_phone_number: Yup.string().required(" phone id is required"),
  service_id: Yup.string().required(" Service id is required"),
  amount: Yup.string().required(" Amount id is required"),
});
