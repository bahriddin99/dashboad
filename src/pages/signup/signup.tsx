import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { singnUpvalidationSchema } from "../../utils/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SignUp } from "../../interface/aouth";
import { useMask } from "@react-input/mask";
import { useState } from "react";
import { auth } from "../../service";
import Signupmodal from "../../components/modal/signup/signupmodal";
import Notifation from "../../utils/notifation";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const initialValues: SignUp = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  };
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (values: SignUp) => {
    setEmail(values.email);
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `+${phone_number}` };
    try {
      const response = await auth.sign_up(payload);
      response.status === 200 && setModal(true);
      console.log(response);
      if (response.status === 200) {
        Notifation({ title: "Success", type: "success" });
      }
    } catch (error) {
      console.log(error);
      Notifation({ title: "Xatolik mavjud", type: "error" });
    }
  };
  return (
    <>
      <ToastContainer />
      <Signupmodal
        open={modal}
        handleClose={() => setModal(false)}
        email={email}
      />
      <div className="h-screen flex items-center border border-3 rounded-md  justify-center flex-col gap-8 p-">
        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
          Ro'yxatdan o'tish
        </h1>
        <div className="max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={singnUpvalidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="full_name"
                  type="text"
                  as={TextField}
                  label="Ismingizni kiriting"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="phone_number"
                  type="tel"
                  as={TextField}
                  label="Telefon raqamingiz"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  inputRef={inputRef}
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="pt-2 pb-2">
                  <button  onClick={() => navigate("/signin")}>
                    login orqali kirish?
                  </button>
                </div>{" "}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
